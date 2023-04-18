import { useState, useEffect, useRef, ReactNode, FC } from 'react';
import ReactDOM from 'react-dom';

type PortalProps = {
  children: ReactNode;
  container?: HTMLElement;
};

type UsePortalReturnType = [
  FC<PortalProps>,
  HTMLElement | null,
  () => void
];

const usePortal = (className?: string): UsePortalReturnType => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const portalRef = useRef<HTMLElement>(document.createElement('div'));

  useEffect(() => {
    const newContainer = document.createElement('div');
    if (className) {
      newContainer.classList.add(className);
    }
    document.body.appendChild(newContainer);
    setContainer(newContainer);
    portalRef.current = newContainer;

    return () => {
      if (container) {
        document.body.removeChild(container);
      }
    };
  }, [container, className]);

  const Portal: FC<PortalProps> = ({ children, container: customContainer }) => {
    const portalContainer = customContainer || container;

    if (!portalContainer) {
      return null;
    }

    return ReactDOM.createPortal(children, portalContainer);
  };

  const removeContainer = () => {
    if (container) {
      document.body.removeChild(container);
      setContainer(null);
    }
  };

  return [Portal, portalRef.current, removeContainer];
};

export default usePortal;
