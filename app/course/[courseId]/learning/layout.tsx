'use client';

import SidebarContent from '../../../../components/sidebar/SidebarContent';

const LearningLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="relative flex min-h-screen">
      <div className="basis-3/4 grow transition-all duration-500">
        {children}
      </div>
      <SidebarContent />
    </div>
  );
};

export default LearningLayout;
