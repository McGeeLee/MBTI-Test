import React from 'react';

interface ModalDialogProps {
  open: boolean;
  onRequestClose: () => void;
  labelledBy: string;
  children: React.ReactNode;
  className?: string;
}

export const ModalDialog: React.FC<ModalDialogProps> = ({
  open,
  onRequestClose,
  labelledBy,
  children,
  className = '',
}) => {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      className={`native-dialog ${className}`}
      onCancel={(event) => {
        event.preventDefault();
        onRequestClose();
      }}
      onClose={onRequestClose}
    >
      {children}
    </dialog>
  );
};
