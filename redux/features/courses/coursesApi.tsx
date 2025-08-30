import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new course
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",  // POST /api/v1/create-course
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    // Get all course info (admin only)
    getAllCourses: builder.query({
      query: () => ({
        url: "get-admin-courses", // GET /api/v1/get-admin-courses
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // Delete a course
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`, // DELETE /api/v1/delete-course/:id
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),

    // Edit course
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`, // PUT /api/v1/edit-course/:id
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),

    // Get all published courses (for users)
    getUsersAllCourses: builder.query({
      query: () => ({
        url: "get-courses", // GET /api/v1/get-courses
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // Get course details by ID
    getCourseDetails: builder.query({
      query: (id: string) => ({
        url: `get-course/${id}`, // GET /api/v1/get-course/:id
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // Get course content (lectures, videos, etc.)
    getCourseContent: builder.query({
      query: (id: string) => ({
        url: `get-course-content/${id}`, // GET /api/v1/get-course-content/:id
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    // Add a new question to a course
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "add-question", // PUT /api/v1/add-question
        method: "PUT",
        body: { question, courseId, contentId },
        credentials: "include" as const,
      }),
    }),

    // Add an answer to a question
    addAnswerInQuestion: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "add-answer", // PUT /api/v1/add-answer
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
      }),
    }),

    // Add review in course
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }: any) => ({
        url: `add-review/${courseId}`, // PUT /api/v1/add-review/:courseId
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),

    // Add reply to a review
    addReplyInReview: builder.mutation({
      query: ({ comment, courseId, reviewId }: any) => ({
        url: `add-reply`, // PUT /api/v1/add-reply
        method: "PUT",
        body: { comment, courseId, reviewId },
        credentials: "include" as const,
      }),
    }),

    // Get AI transcript of a video
    getTranscript: builder.mutation({
      query: ({ id, videoName }) => ({
        url: `ai/${id}`, // POST /api/v1/ai/:id
        method: "POST",
        body: { videoName },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,
  useGetTranscriptMutation,
} = coursesApi;
