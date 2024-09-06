'use client';

const ExerciseLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full px-4 py-16">
      {children}
    </div>
  );
};

export default ExerciseLayout;
