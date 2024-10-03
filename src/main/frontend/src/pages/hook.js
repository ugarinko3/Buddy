// // HookPost.js
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCalendarDay } from "../store/slice/calendarSlice";
//
// function HookPost(login, role, id) {
//     const dispatch = useDispatch();
//     const { dayPost, error, loading } = useSelector((state) => state.calendar);
//
//     useEffect(() => {
//
//                 dispatch(fetchCalendarDay(login, role, id));
//
//     }, [dispatch, login, role, id, loading]); // Добавляем loading и dayPost.length в зависимости
//
//     return { dayPost, error, loading };
// }
//
// export default HookPost;
