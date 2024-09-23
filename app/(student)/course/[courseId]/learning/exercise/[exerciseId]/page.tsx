'use client';

import ExerciseHistory from '@/components/exercise/ExerciseHistory';
import ExerciseInfo from '@/components/exercise/ExerciseInfo';
import { useCreateProgressExerciseMutation } from '@/lib/features/submission/submissionApi';
import { RootState } from '@/lib/store';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

type Params = {
  courseId: string;
  exerciseId: string;
};

const ExercisePage: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { progressId } = useSelector((state: RootState) => state.progress);
  const { exerciseIds } = useSelector((state: RootState) => state.progress);
  const { isDoingSubmission } = useSelector(
    (state: RootState) => state.submission,
  );
  const { exerciseId }: Params = useParams();
  const [trigger] = useCreateProgressExerciseMutation();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (isDoingSubmission) {
      router.push(`${pathName}/submission`);
    }
  }, [isDoingSubmission]);

  const handleDoSubmission = async () => {
    try {
      const res = await trigger({
        progressId,
        exerciseId: Number(exerciseId),
        accessToken,
      }).unwrap();
      if (res.statusCode === 201) {
        toast.success('Get submission successfully');
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return exerciseIds.includes(Number(exerciseId)) ? (
    <ExerciseHistory
      exerciseId={Number(exerciseId)}
      handleDoSubmission={handleDoSubmission}
    />
  ) : (
    <ExerciseInfo
      exerciseId={Number(exerciseId)}
      handleDoSubmission={handleDoSubmission}
    />
  );
};

export default ExercisePage;
