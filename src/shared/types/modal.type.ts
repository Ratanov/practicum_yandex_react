export type TModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
} & React.PropsWithChildren;
