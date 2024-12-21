import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  Button,
  Box,
  CircularProgress,
  Dialog
} from "@mui/material";
import { Link } from "react-router-dom";
import DeleteModel from "../../components/model/deleteModel";
import { useDispatch, useSelector } from "react-redux";
import { deleteClass, getAllClasses } from "../../features/class/actions/classActions";
import { getAllClassesSelector, loadingSelector, deleteLoadingSelector } from "../../features/class/selectors/classSelector";
import UpdateClassModel from "./updateClass";
import CreateClassModel from "./createClass";
import { Create } from "@mui/icons-material";

export default function ViewClass() {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showUpdateModel, setShowUpdateModel] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);
  
  const classes = useSelector(getAllClassesSelector);
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const loading = useSelector(loadingSelector);
  const deleteLoading = useSelector(deleteLoadingSelector);

  useEffect(() => {
    if (classes.length === 0) {
      dispatch(getAllClasses());
    }

    setShowDeleteModel(false);
  }, [classes]);

  const deleteHandle = () => {
    dispatch(deleteClass(deleteId));
    setDeleteId(null);
  }


console.log(showUpdateModel,updateId);

  return (
    <Container maxWidth="xl">
          
          <Box sx={{ display: "flex", my: 2 }}>
            <Typography variant="h5" sx={{ flexGrow: 1 }}>
              Classes
            </Typography>
            <Button
              onClick={() => setShowCreateModel(true)}
              variant="contained"
              sx={{
                p: 1.2,
                backgroundImage:(theme)=> theme.palette.gradientColors[1],
              }}
            >
              ADD CLASS
            </Button>
          </Box>
          {loading ? <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }} >
        <CircularProgress />
      </Box> :
          <Box>
            {
              classes.length > 0 ?
                <Grid container spacing={2}>
                  {classes.map((item) => (
                    <ClassItem
                      key={item._id}
                      item={item}
                      setShowDeleteModel={setShowDeleteModel}
                      setDeleteId={setDeleteId}
                      setShowUpdateModel={setShowUpdateModel}
                      setUpdateId={setUpdateId}
                    />
                  ))}
                </Grid>
                : <Card sx={{ display:'flex',justifyContent:'center',alignItems:'center',height:'60vh' }}>
                  <Typography variant="h6" sx={{ textAlign: 'center' }} >No class found</Typography>
                </Card>
            }
          </Box>
        }

<DeleteModel 
           showModel={showDeleteModel}
            setShowModel={setShowDeleteModel}
            deleteHandle={deleteHandle}
            data='Class'
            desc='Deleting this class will delete all class subjects and materials associated with this class.Are you sure you want to delete this class?'
            loading={deleteLoading}
           />
           <UpdateClassModel showModel={showUpdateModel} setShowModel={setShowUpdateModel}  classId={updateId} />
            <CreateClassModel showModel={showCreateModel} setShowModel={setShowCreateModel}  />
      
    </Container>
  );
}

function ClassItem({ item, setShowDeleteModel, setDeleteId ,setShowUpdateModel,setUpdateId}) {
  const [loader, setLoader] = useState(true);

  const deleteButtonClick = () => {
    setShowDeleteModel(true);
    setDeleteId(item._id);
  }

  const updateModelHandler = () => {
    setShowUpdateModel(true);
    setUpdateId(item._id);
  }
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        sx={{
          p: 1.5,
          boxShadow: (theme) => theme.shadows[6],
          borderRadius: 2,
          height: "100%",
        }}
      >
        <Box
          component={"img"}
          src={item.image}
          onLoad={() => setLoader(false)}
          sx={{
            width: 1,
            height: "150px",
            objectFit: "cover",
            borderRadius: 1,
            display: loader ? "none" : "block",
          }}
        />
        {loader && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "150px",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        <Typography variant="subtitle1" sx={{ textAlign: "center", my: 2 }}>
          {item.className}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <Button
            onClick={() =>updateModelHandler()}
            variant="contained"
            sx={{ p:1.2, backgroundImage:(theme)=> theme.palette.gradientColors[1], }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            sx={{
              p: 1.2,
              backgroundImage:(theme)=> theme.palette.gradientColors[0],
            }}
            onClick={() => deleteButtonClick()}
          >
            Delete
          </Button>
          <Button
            component={Link}
            to={`/class/manage-class/${item._id}`}
            variant="contained"
            sx={{p:1.2, backgroundImage:(theme)=> theme.palette.gradientColors[2], }}
          >
            Manage Subjects
          </Button>
        </Box>
      </Card>
    </Grid>
  );
}
