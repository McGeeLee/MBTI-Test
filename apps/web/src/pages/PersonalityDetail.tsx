import React from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  Heart,
  Palette,
  Star,
  TrendingUp,
} from 'lucide-react';

import { Layout } from '../components/Layout';
import { TypeIcon } from '../components/icons/TypeIcons';
import { useLocale } from '../context/LocaleContext';
import { getStrings } from '../i18n/strings';
import { getLocalizedType } from '../lib/localeData';
import { buildLuckyColorPalette } from '../lib/typePresentation';

const SectionTitle = ({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <h3 className="mb-4 flex items-center text-xl font-bold text-gray-900">
    <div className="mr-3 rounded-xl bg-blue-100/50 p-2.5 shadow-sm">
      <Icon size={20} className="text-blue-600" />
    </div>
    {title}
  </h3>
);

export const PersonalityDetail: React.FC = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const navigate = useNavigate();
  const { locale } = useLocale();
  const strings = getStrings(locale).typeDetail;
  const typeData = typeId ? getLocalizedType(locale, typeId) : null;

  if (!typeData) {
    return <Navigate to="/types" replace />;
  }

  const luckyPalette = buildLuckyColorPalette(typeData);

  return (
    <Layout>
      <div className="fixed left-0 top-0 -z-10 h-full w-full overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-0 h-full w-full bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30"></div>
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-200 opacity-20 blur-3xl mix-blend-multiply animate-blob"></div>
        <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl mix-blend-multiply animate-blob animation-delay-2000"></div>
      </div>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
        <button
          onClick={() => navigate('/types')}
          className="group flex items-center text-gray-500 transition-colors hover:text-blue-600"
        >
          <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/50 shadow-sm transition-colors group-hover:bg-blue-100">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
          </div>
          <span className="font-medium">{strings.backToLibrary}</span>
        </button>

        <div className="glass-card relative flex flex-col items-center overflow-hidden rounded-3xl border border-white/60 p-8 shadow-lg md:flex-row md:p-12">
          <div className="absolute left-0 top-0 h-2 w-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
          <div className="group relative mb-8 h-48 w-48 flex-shrink-0 md:mb-0 md:mr-12 md:h-60 md:w-60">
            <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-3xl transition-colors duration-500 group-hover:bg-blue-400/30"></div>
            <TypeIcon
              type={typeData.id}
              size="100%"
              className="relative z-10 text-blue-600 drop-shadow-xl transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="relative z-10 text-center md:text-left">
            <div className="mb-5 inline-block rounded-full border border-blue-100 bg-blue-50/80 px-4 py-1.5 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-sm">
              {typeData.category || strings.fallbackCategory}
            </div>
            <h1 className="mb-3 text-5xl font-extrabold tracking-tight text-gray-900 md:text-6xl">
              {typeData.id}
            </h1>
            <h2 className="mb-5 text-2xl font-bold text-gray-700 md:text-3xl">{typeData.name}</h2>
            <p className="max-w-2xl text-lg leading-relaxed text-gray-600">{typeData.summary}</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-8">
          <div className="glass-panel rounded-2xl border border-white/50 p-8 shadow-sm transition-shadow hover:shadow-md">
            <SectionTitle icon={Star} title={strings.coreTraits} />
            <div className="flex flex-wrap gap-2.5">
              {typeData.description.traits.map((trait, index) => (
                <span
                  key={index}
                  className="rounded-xl border border-gray-200/60 bg-white/80 px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/50 p-8 shadow-sm transition-shadow hover:shadow-md">
            <SectionTitle icon={Palette} title={strings.luckyColors} />
            <div className="mb-4 flex items-center space-x-5">
              <div
                className="h-20 w-20 rotate-3 rounded-2xl border-4 border-white shadow-lg transition-transform hover:rotate-6"
                style={{ backgroundColor: typeData.luckyColors.primary }}
              ></div>
              <div>
                <span className="block text-lg font-bold text-gray-900">{strings.primaryColor}</span>
                <span className="rounded border border-gray-100 bg-white/50 px-2 py-0.5 text-sm font-mono text-gray-500">
                  {typeData.luckyColors.primary}
                </span>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-3">
              {luckyPalette.map((color) => (
                <div
                  key={color}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white/70 px-3 py-2 shadow-sm"
                >
                  <span
                    className="h-6 w-6 rounded-lg border border-black/10"
                    style={{ backgroundColor: color }}
                  ></span>
                  <span className="text-xs font-mono text-gray-600">{color}</span>
                </div>
              ))}
            </div>
            <p className="rounded-lg border border-white/40 bg-white/40 p-3 text-sm italic text-gray-600">
              “{typeData.luckyColors.meaning}”
            </p>
          </div>

          <div className="glass-panel rounded-2xl border border-white/50 p-8 shadow-sm transition-shadow hover:shadow-md md:col-span-2">
            <SectionTitle icon={Briefcase} title={strings.careerDirections} />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {typeData.description.careers.map((career, index) => (
                <div
                  key={index}
                  className="flex items-center rounded-xl bg-white/60 p-3.5 shadow-sm transition-transform hover:scale-105"
                >
                  <div className="mr-3 h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm shadow-green-200"></div>
                  <span className="font-medium text-gray-700">{career}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/50 p-8 shadow-sm transition-shadow hover:shadow-md">
            <SectionTitle icon={TrendingUp} title={strings.strengths} />
            <ul className="space-y-3">
              {typeData.description.strengths.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start rounded-xl border border-green-100/50 bg-green-50/50 p-3"
                >
                  <span className="mr-2.5 font-bold text-green-600">✓</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-2xl border border-white/50 p-8 shadow-sm transition-shadow hover:shadow-md">
            <SectionTitle icon={AlertCircle} title={strings.blindSpots} />
            <ul className="space-y-3">
              {typeData.description.weaknesses.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start rounded-xl border border-red-100/50 bg-red-50/50 p-3"
                >
                  <span className="mr-2.5 font-bold text-red-500">!</span>
                  <span className="text-sm text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass-panel rounded-2xl border border-white/50 p-8 shadow-sm transition-shadow hover:shadow-md md:col-span-2">
            <SectionTitle icon={Heart} title={strings.relationships} />
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="mb-3 flex items-center font-bold text-gray-900">
                  <span className="mr-2 h-5 w-1.5 rounded-full bg-pink-500"></span>
                  {strings.bestMatches}
                </h4>
                <div className="mb-6 flex flex-wrap gap-3">
                  {typeData.relationships.compatible.map((relatedType) => (
                    <Link
                      key={relatedType}
                      to={`/type/${relatedType}`}
                      className="rounded-full border border-pink-100 bg-pink-50 px-4 py-1.5 font-bold text-pink-700 shadow-sm transition-colors hover:bg-pink-100"
                    >
                      {relatedType}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="mb-3 flex items-center font-bold text-gray-900">
                  <span className="mr-2 h-5 w-1.5 rounded-full bg-purple-500"></span>
                  {strings.gettingAlong}
                </h4>
                <p className="rounded-2xl border border-white/60 bg-white/60 p-5 leading-relaxed text-gray-600 shadow-inner">
                  {typeData.relationships.advice}
                </p>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="mb-3 flex items-center font-bold text-gray-900">
                <span className="mr-2 h-5 w-1.5 rounded-full bg-amber-500"></span>
                {strings.potentialFriction}
              </h4>
              <div className="flex flex-wrap gap-3">
                {typeData.relationships.challenging.map((relatedType) => (
                  <Link
                    key={relatedType}
                    to={`/type/${relatedType}`}
                    className="rounded-full border border-amber-100 bg-amber-50 px-4 py-1.5 font-bold text-amber-700 shadow-sm transition-colors hover:bg-amber-100"
                  >
                    {relatedType}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/50 p-8 shadow-sm transition-shadow hover:shadow-md md:col-span-2">
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
              <div className="mr-3 rounded-xl bg-green-100/50 p-2.5 shadow-sm">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              {strings.growthGuide}
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
                <h4 className="mb-4 flex items-center text-lg font-bold text-green-800">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-200 text-xs">
                    1
                  </span>
                  {strings.growthPath}
                </h4>
                <ul className="space-y-3">
                  {typeData.development.growthPath.map((path, index) => (
                    <li key={index} className="flex items-start text-sm text-green-800">
                      <span className="mr-2.5 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-400"></span>
                      <span className="leading-relaxed">{path}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
                <h4 className="mb-4 flex items-center text-lg font-bold text-blue-800">
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-200 text-xs">
                    2
                  </span>
                  {strings.practicalTips}
                </h4>
                <ul className="space-y-3">
                  {typeData.development.tips.map((tip, index) => (
                    <li key={index} className="flex items-start text-sm text-blue-800">
                      <span className="mr-2.5 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-400"></span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-white/50 p-8 shadow-sm transition-shadow hover:shadow-md md:col-span-2">
            <h3 className="mb-6 flex items-center text-xl font-bold text-gray-900">
              <div className="mr-3 rounded-xl bg-purple-100/50 p-2.5 shadow-sm">
                <Star size={20} className="text-purple-600" />
              </div>
              {strings.notablePeople}
            </h3>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {typeData.famousPeople?.map((person, index) => (
                <div
                  key={index}
                  className="group rounded-2xl border border-white/60 bg-white/60 p-5 text-center transition-all hover:bg-white hover:shadow-md"
                >
                  <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 text-xl font-bold text-purple-700 shadow-sm transition-transform group-hover:scale-110">
                    {person.name.charAt(0)}
                  </div>
                  <h4 className="font-bold text-gray-900">{person.name}</h4>
                  <p className="mt-1 text-xs text-gray-500">{person.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
