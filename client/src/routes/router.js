import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts';
import  {getAuthSelector} from '../features/auth/selectors/authSelector'
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

export const IndexPage = lazy(() => import('../pages/dashboard/dashboard'));
export const ClassPage = lazy(() => import('../pages/class/ViewClass.js'));
export const CreateClassPage = lazy(() => import('../pages/class/createClass'));
export const ManageClassPage = lazy(() => import('../pages/class/manageClass'));
export const CreateClassSubjectPage = lazy(() => import('../pages/class/createClassSubject'));
export const UpdateClassPage = lazy(() => import('../pages/class/updateClass'))
export const SubjectPage = lazy(() => import('../pages/subject/subject'))
export const CreateSubjectPage = lazy(() => import('../pages/subject/createSubject'))
export const UpdateSubjectPage = lazy(() => import('../pages/subject/updateSubject'))
export const MaterialPage = lazy(() => import('../pages/material/material'))
export const CreateMaterialPage = lazy(() => import('../pages/material/createMaterial'))
export const UpdateMaterialPage = lazy(() => import('../pages/material/updateMaterial'))
export const MediumPage = lazy(() => import('../pages/medium/medium'))
export const CreateMediumPage = lazy(() => import('../pages/medium/createMedium'))
export const UpdateMediumPage = lazy(() => import('../pages/medium/updateMedium'))
export const CategoryPage = lazy(() => import('../pages/category/category.js'))
export const CreateCategoryPage = lazy(() => import('../pages/category/createCategory'))
export const UpdateCategoryPage = lazy(() => import('../pages/category/updateCategory'))
export const LanguagePage = lazy(() => import('../pages/language/language'))
export const CreateLanguagePage = lazy(() => import('../pages/language/createLanguage'))
export const UpdateLanguagePage = lazy(() => import('../pages/language/updateLanguage'))
export const NewsPage = lazy(() => import('../pages/news/news'))
export const CreateNewsPage = lazy(() => import('../pages/news/createNews'))
export const UpdateNewsPage = lazy(() => import('../pages/news/updateNews'))
export const SliderPage = lazy(() => import('../pages/slider/slider'))
export const CreateSliderPage = lazy(() => import('../pages/slider/createSlider'))
export const UpdateSliderPage = lazy(() => import('../pages/slider/updateSlider'))
export const ReviewPage = lazy(() => import('../pages/review/review'))
export const SupportPage = lazy(() => import('../pages/support/support'))
export const ReportPage = lazy(() => import('../pages/report/report'))
export const Page404 = lazy(() => import('../pages/page-not-found/index'))
export const NotificationPage = lazy(() => import('../pages/notification/notification'))
export const CreateNotificationPage = lazy(() => import('../pages/notification/createNotification'))
export const VersionPage = lazy(() => import('../pages/version/version.js'))
export const CreateVersionPage = lazy(() => import('../pages/version/createVersion.js'))
export const UpdateVersionPage = lazy(() => import('../pages/version/updateVersion.js'))
export const SettingPage = lazy(() => import('../pages/setting/setting.js'))
export const UserPage = lazy(() => import('../pages/user/user.js'))
export const CreateUserPage = lazy(() => import('../pages/user/createUser.js'))
export const UpdateUserPage = lazy(() => import('../pages/user/updateUser.js'))
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('../pages/login/login'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
// export const Page404 = lazy(() => import('src/pages/page-not-found'));


console.log(DashboardLayout);
console.log(IndexPage);



// ----------------------------------------------------------------------
export default function Router() {
  const auth = useSelector(getAuthSelector);
  const isAuthenticated = () => {
    if(auth.token && auth.isAuthenticated && auth.user){
      return true
    }
    return false
  }

  const ProtectedRoute = ({ children,roles }) => {
    if(!isAuthenticated()){
      return <Navigate to="/login" />
    }

    const hasPermission = roles.includes(auth.user.role)
     return hasPermission ? children : <Navigate to="/404" />
  };

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<Box><Typography>Loading...</Typography></Box>}  >
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element:<ProtectedRoute roles={['admin','user']} ><IndexPage /></ProtectedRoute>, index: true },
        { path: 'class', element: <ProtectedRoute roles={['admin','user']}  ><ClassPage /></ProtectedRoute> },
        { path: 'class/create', element: <ProtectedRoute roles={['admin','user']}  ><CreateClassPage /></ProtectedRoute> },
        { path: 'class/update/:classId', element: <ProtectedRoute roles={['admin','user']}  ><UpdateClassPage /></ProtectedRoute> },
        { path: 'class/manage-class/:classId', element: <ProtectedRoute roles={['admin','user']}  ><ManageClassPage /></ProtectedRoute> },
        { path: 'class/:classId/subject/create', element: <ProtectedRoute roles={['admin','user']}  ><CreateClassSubjectPage /></ProtectedRoute> },
        { path: 'subject', element: <ProtectedRoute roles={['admin','user']}  ><SubjectPage /></ProtectedRoute> },
        { path: 'subject/create', element: <ProtectedRoute roles={['admin','user']}  ><CreateSubjectPage /></ProtectedRoute> },
        { path: 'subject/update/:subjectId', element: <ProtectedRoute roles={['admin','user']}  ><UpdateSubjectPage /></ProtectedRoute> },
        { path: 'material', element: <ProtectedRoute roles={['admin','user']}  ><MaterialPage /></ProtectedRoute> },
        { path: 'material/create', element: <ProtectedRoute roles={['admin','user']}  ><CreateMaterialPage /></ProtectedRoute> },
        { path: 'material/update/:materialId', element: <ProtectedRoute roles={['admin','user']}  ><UpdateMaterialPage /></ProtectedRoute> },
        { path: 'medium', element: <ProtectedRoute roles={['admin','user']}  ><MediumPage /></ProtectedRoute> },
        { path: 'medium/create', element: <ProtectedRoute roles={['admin','user']}  ><CreateMediumPage /></ProtectedRoute> },
        { path: 'medium/update/:mediumId', element: <ProtectedRoute roles={['admin','user']}  ><UpdateMediumPage /></ProtectedRoute> },
        { path: 'category', element: <ProtectedRoute roles={['admin','user']}  ><CategoryPage /></ProtectedRoute> },
        { path: 'category/create', element: <ProtectedRoute roles={['admin','user']}  ><CreateCategoryPage /></ProtectedRoute> },
        { path: 'category/update/:categoryId', element: <ProtectedRoute roles={['admin','user']}  ><UpdateCategoryPage /></ProtectedRoute> },
        { path: 'language', element: <ProtectedRoute roles={['admin','user']}  ><LanguagePage /></ProtectedRoute> },
        { path: 'language/create', element: <ProtectedRoute roles={['admin','user']}  ><CreateLanguagePage /></ProtectedRoute> },
        { path: 'language/update/:languageId', element: <ProtectedRoute roles={['admin','user']} ><UpdateLanguagePage /></ProtectedRoute> },
        { path: 'news', element: <ProtectedRoute  roles={['admin','user']}  ><NewsPage /></ProtectedRoute> },
        { path: 'news/create', element: <ProtectedRoute  roles={['admin','user']}  ><CreateNewsPage /></ProtectedRoute> },
        { path: 'news/update/:newsId', element: <ProtectedRoute roles={['admin','user']}  ><UpdateNewsPage /></ProtectedRoute> },
        { path: 'slider', element: <ProtectedRoute roles={['admin','user']}  ><SliderPage /></ProtectedRoute> },
        { path: 'slider/create', element: <ProtectedRoute roles={['admin','user']}  ><CreateSliderPage /></ProtectedRoute> },
        { path: 'slider/update/:sliderId', element: <ProtectedRoute roles={['admin','user']}  ><UpdateSliderPage /></ProtectedRoute> },
        { path: 'review', element: <ProtectedRoute  roles={['admin']} ><ReviewPage /></ProtectedRoute> },
        { path: 'support', element: <ProtectedRoute roles={['admin']} ><SupportPage /></ProtectedRoute> },
        { path: 'report', element: <ProtectedRoute roles={['admin']} ><ReportPage /></ProtectedRoute> },
        { path: 'notification', element: <ProtectedRoute roles={['admin']} ><NotificationPage /></ProtectedRoute> },
        { path: 'notification/create', element: <ProtectedRoute roles={['admin']} ><CreateNotificationPage /></ProtectedRoute> },
        { path: 'version', element: <ProtectedRoute roles={['admin']} ><VersionPage /></ProtectedRoute> },
        { path: 'version/create', element: <ProtectedRoute roles={['admin']} ><CreateVersionPage /></ProtectedRoute> },
        { path: 'version/update/:versionId', element: <ProtectedRoute roles={['admin']} ><UpdateVersionPage /></ProtectedRoute>},
        { path: 'setting', element: <ProtectedRoute roles={['admin','user']} ><SettingPage /></ProtectedRoute> },
        { path: 'user', element: <ProtectedRoute roles={['admin']} ><UserPage /></ProtectedRoute> },
        { path: 'user/create', element: <ProtectedRoute roles={['admin']}><CreateUserPage /></ProtectedRoute> },
        { path: 'user/update/:userId', element: <ProtectedRoute roles={['admin']}><UpdateUserPage /></ProtectedRoute> },
        
      ],
    },
    {
      path: 'login',
      element: isAuthenticated() ? <Navigate to="/" /> : <LoginPage />,
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
     {
      path: '404',
      element: <Page404 />,
    },
  ]);

  return routes;

}
