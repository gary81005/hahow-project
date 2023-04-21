export interface AlertInfoProps {
  alertOpen: boolean;
  status: 'warning' | 'success' | 'error';
  info: string | null;
  onClose?: () => void;
}
