import { menuAdminAtom } from '@sdk/store';
import { useAtom } from 'jotai';

function useMenuAdmin() {
  const [isOpen, setOpen] = useAtom(menuAdminAtom);

  const onClose = () => setOpen(false);
  const onOpen = () => setOpen(true);

  return {
    isOpen,
    onClose,
    onOpen,
  };
}

export default useMenuAdmin;
