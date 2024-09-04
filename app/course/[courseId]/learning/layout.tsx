'use client';

import SidebarContent from '../../../../components/SidebarContent';

const LearningLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="relative flex min-h-[600px]">
      <div className="basis-3/4 grow">{children}</div>
      <SidebarContent />
    </div>
  );
};

export default LearningLayout;
