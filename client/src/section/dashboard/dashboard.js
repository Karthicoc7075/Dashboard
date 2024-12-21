import { Card, Box, Stack, Grid, Typography, Container, CircularProgress, alpha, } from '@mui/material'
import React, { useEffect } from 'react'
import userIcon from '../../assets/icons/circle-user.png'
import { useDispatch, useSelector } from 'react-redux'
import { getDashboardData } from '../../features/dashboard/actions/dashboardActions'
import { getDashboardDataSelectors, loadingSelectors } from '../../features/dashboard/selectors/dashboardSelecors'


import ClassIcon from "../../assets/icons/navbar/class.png";
import SubjectIcon from "../../assets/icons/navbar/subject.png";
import MaterialIcon from "../../assets/icons/navbar/material.png";
import MediumIcon from "../../assets/icons/navbar/medium.png";
import CategoryIcon from "../../assets/icons/navbar/category.png";
import LanguageIcon from "../../assets/icons/navbar/language.png";
import NewsIcon from "../../assets/icons/navbar/news.png";
import SliderIcon from "../../assets/icons/navbar/slider.png";
import ReviewIcon from "../../assets/icons/navbar/review.png";
import SupportIcon from "../../assets/icons/navbar/support.png";
import ReportIcon from "../../assets/icons/navbar/report.png";
import NotificationIcon from "../../assets/icons/navbar/notification.png";
import VersionIcon from "../../assets/icons/navbar/version.png";
import SettingIcon from "../../assets/icons/navbar/setting.png";
import SvgColor from '../../components/svg-color'

export default function Dashboard() {
  const dashboardDataCount = useSelector(getDashboardDataSelectors);
  const loading = useSelector(loadingSelectors);
  const dispatch = useDispatch();


  useEffect(() => {
   if(dashboardDataCount == null){
    dispatch(getDashboardData())
   }
  }, [dashboardDataCount]);

  const colors = [
    'linear-gradient(310deg, #ea0606 0%, #ff667c 100%)',
    'linear-gradient(310deg, #f53939 0%, #fbcf33 100%)',
    'linear-gradient(310deg, #17ad37 0%, #98ec2d 100%)',
    'linear-gradient(310deg, #7928CA 0%, #FF0080 100%)',
    'linear-gradient(310deg, #627594 0%, #A8B8D8 100%)',
    'linear-gradient(310deg, #2152ff 0%, #21d4fd 100%)',
    'linear-gradient(310deg, #369f9f 0%, #9bffff 100%)',
    'linear-gradient(310deg, #6927d3 0%, #eec5ff 100%)',
    'linear-gradient(310deg, #1b4e9b 0%, #98e7ff 100%)',
    'linear-gradient(310deg, #c18d16 0%, #daff45 100%)',
    'linear-gradient(310deg, #ea0606 0%, #ff667c 100%)',
    'linear-gradient(310deg, #f53939 0%, #fbcf33 100%)',
    'linear-gradient(310deg, #17ad37 0%, #98ec2d 100%)',
    'linear-gradient(310deg, #7928CA 0%, #FF0080 100%)',
    'linear-gradient(310deg, #627594 0%, #A8B8D8 100%)',
    'linear-gradient(310deg, #2152ff 0%, #21d4fd 100%)',
    'linear-gradient(310deg, #369f9f 0%, #9bffff 100%)',
    'linear-gradient(310deg, #6927d3 0%, #eec5ff 100%)',
    'linear-gradient(310deg, #1b4e9b 0%, #98e7ff 100%)',
    'linear-gradient(310deg, #c18d16 0%, #daff45 100%)',



  ]


  const dashboardData = [
    {
      title: 'Total Users',
      count: dashboardDataCount?.totalUsers,
      color: colors[0],
      icon: userIcon
    },
    {
      title: 'Total Class',
      count: dashboardDataCount?.totalClasses,
      color: colors[1],
      icon: ClassIcon
    },
    {
      title: 'Subjects',
      count: dashboardDataCount?.totalSubjects,
      color: colors[2],
      icon: SubjectIcon
    },
    {
      title: 'Materials',
      count: dashboardDataCount?.totalMaterials,
      color: colors[3],
      icon: MaterialIcon
    },
    {
      title: 'Medium',
      count: dashboardDataCount?.totalMediums,
      color: colors[4],
      icon: MediumIcon
    },
    {
      title: 'Categories',
      count: dashboardDataCount?.totalCategories,
      color: colors[5],
      icon: CategoryIcon
    },
    {
      title: 'Languages',
      count: dashboardDataCount?.totalLanguages,
      color: colors[6],
      icon: LanguageIcon
    },
    {
      title: 'Total News',
      count: dashboardDataCount?.totalNews,
      color: colors[7],
      icon: NewsIcon
    },
    {
      title: 'Total Sliders',
      count: dashboardDataCount?.totalSliders,
      color: colors[8],
      icon: SliderIcon
    },
    {
      title: 'Total Reviews',
      count: dashboardDataCount?.totalReviews,
      color: colors[9],
      icon: ReviewIcon
    },
    {
      title: 'Pending Supports',
      count: dashboardDataCount?.totalPendingSupports,
      color: colors[10],
      icon: SupportIcon
    },
    {
      title: 'Reports',
      count: dashboardDataCount?.totalReports,
      color: colors[11],
      icon: ReportIcon
    },
    {
      title: 'Notification',
      count: dashboardDataCount?.totalNotifications,
      color: colors[12],
      icon: NotificationIcon
    },
    {
      title: 'Versions',
      count: dashboardDataCount?.totalVersions,
      color: colors[13],
      icon: VersionIcon
    },
    {
      title: 'Revenue',
      count: 75.353,
      color: colors[14],
      icon: SettingIcon
    },
    {
      title: 'Revenue',
      count: 75.353,
      color: colors[15],
      icon: SettingIcon
    },
    {
      title: 'Revenue',
      count: 75.353,
      color: colors[16],
      icon: SettingIcon
    },
    {
      title: 'Revenue',
      count: 75.353,
      color: colors[17],
      icon: SettingIcon
    },
    {
      title: 'Revenue',
      count: 75.353,
      color: colors[18],
      icon: SettingIcon
    },
  ]


  console.log();

  return (
    <Container maxWidth="xl" >
      <Typography variant="h4" sx={{ mt: 2, mb: 5, ml: 2 }}>
        Hi, Welcome back 👋
      </Typography>

      {
        loading ?
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60dvh'
        }} >
          <CircularProgress />
        </Box>
        : <Box>
          {
            dashboardDataCount !=null ?
              <Grid container spacing={3}>
                {
                  dashboardData.map((item, index) => (
                    <DashboardItem key={index} item={item} index={index}/>
                  ))
                }
              </Grid>
              : <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }} >No data found</Typography>
          }
        </Box>
      }

    </Container>
  )
}



function DashboardItem({ item, index }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} >
      <Card
        component={Stack}
        spacing={3}
        direction="row"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: { xs: 4, sm: 2.6 },
          px: 2,
          borderRadius: 2,
          boxShadow: '0 20px 27px 0 rgba(0, 0, 0, 0.05)'
        }}

      >

        <Stack spacing={0.5}>
          <Typography variant="subtitle1" sx={{ color: 'text.disabled' }}>
            {item.title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 'fontWeightSemiBold' }}>{item.count}</Typography>


        </Stack>

        <Box sx={{
          width: '72px',
          height: '72px',
          borderRadius: 0.8,
          p: 1.8,
          backgroundImage:theme=>theme.palette.gradientColors[index%10],
          boxShadow: (shadow) => shadow.shadows[6],
        }}
        >
          <SvgColor src={item.icon}  color={'#fff'} width={40} height={40} />
        </Box>

      </Card>

    </Grid>
  )
}