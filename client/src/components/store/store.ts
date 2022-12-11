// import { configureStore } from '@reduxjs/toolkit'
// import { planSlice, throwid } from './PlanID'

// export default configureStore({
//   reducer: {

//     planid: planSlice,

//   },

// })
import { configureStore } from '@reduxjs/toolkit'
import planSlice from './PlanID'
export const store = configureStore({
  reducer:{ planid: planSlice,}
})
// export type RootState = ReturnType<typeof store.getState>