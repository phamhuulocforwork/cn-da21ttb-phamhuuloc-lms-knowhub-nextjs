// import { QuizCard } from '@/components/blocks/quiz/quiz-card';

// import { Quiz } from '@/types/quiz';

// export default function QuizGrid({ quizzes }: { quizzes: Quiz[] }) {
//   return (
//     <div className='grid grid-cols-1 gap-6 md:grid-cols-3 2xl:grid-cols-4'>
//       {quizzes.map((quiz, index) => (
//         <QuizCard
//           key={quiz.id}
//           title={quiz.title}
//           description={quiz?.description || ''}
//           thumbnail={quiz?.thumbnail || ''}
//           categories={quiz.categories}
//           updatedAt={quiz.updatedAt}
//           enrollments={quiz._count.enrollments}
//           questions={quiz._count.questions}
//         />
//       ))}
//     </div>
//   );
// }
