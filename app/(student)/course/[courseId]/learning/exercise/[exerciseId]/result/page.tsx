'use client';

import ExerciseHeader from '@/components/exercise/ExerciseHeader';
import ExerciseTable from '@/components/exercise/ExerciseTable';
import SubmissionDetail from '@/components/exercise/SubmissionDetail';
import Loading from '@/components/Loading';
import { useGetSubmissionDetailQuery } from '@/lib/features/submission/submissionApi';
import { RootState } from '@/lib/store';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ResultPage: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { progressExerciseId } = useSelector(
    (state: RootState) => state.submission,
  );
  const { data, isLoading } = useGetSubmissionDetailQuery({
    progressExerciseId,
    accessToken,
  });
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!progressExerciseId) {
      router.push(`${pathName.split('/').slice(0, -1).join('/')}`);
    }
  }, [progressExerciseId]);

  const handleBackList = () => {
    router.push(`${pathName.split('/').slice(0, -1).join('/')}`);
  };

  if (!data || isLoading) return <Loading />;

  return (
    <div className="w-[1000px]">
      <ExerciseHeader />
      <ExerciseTable submissions={[data.submission]} />
      <SubmissionDetail answerDetails={data.answerDetails} />
      <div className="flex gap-6 w-full justify-start">
        <button
          className="btn btn-medium btn-primary heading-sm rounded-md"
          onClick={handleBackList}
        >
          Back to list
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
