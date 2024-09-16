'use client';

import SidebarContent from '@/components/sidebar/SidebarContent';

const LearningLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <main className="relative flex min-h-[600px]">
      <div className="basis-3/4 grow transition-all duration-500">
        {children}
      </div>
      <SidebarContent />
    </main>
  );
};

export default LearningLayout;
