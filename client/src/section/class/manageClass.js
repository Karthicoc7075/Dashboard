import {
  Container,
  Typography,
  Box,
  Card,
  Button,
  TableContainer,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  classSubjectsSelector,
  loadingSelector,
  deleteLoadingSelector
} from "../../features/class/selectors/classSelector";
import { getManageClass, deleteClassSubject } from "../../features/class/actions/classActions";
import DeleteModel from "../../components/model/deleteModel";
import CreateClassSubjectModel from './createClassSubject'

export default function ManageClass() {
  const [showDeleteModel, setShowDeleteModel] = useState(false);
  const [showCreateModel, setShowCreateModel] = useState(false);

  const [deleteId, setDeleteId] = useState(null);
  const classId = useParams().classId;
  const classSubjects = useSelector(classSubjectsSelector);
  const loading = useSelector(loadingSelector);
  const deleteLoading = useSelector(deleteLoadingSelector);
  const dispatch = useDispatch();

  useEffect(() => {


    dispatch(getManageClass(classId));


  }, []);


  useEffect(() => {
    setShowDeleteModel(false);
  }, [classSubjects]);

  const deleteHandle = () => {
    dispatch(deleteClassSubject(classId, deleteId));
    setDeleteId(null);
  }
  return (
    <Container maxWidth="lg">

      <Box sx={{ mb: 2, textAlign: "end" }}>
        <Button
          onClick={() => setShowCreateModel(true)}
          variant="contained"
          sx={{
            p: 1.2,
            backgroundImage: (theme) => theme.palette.gradientColors[1],
          }}
        >
          ADD CLASS
        </Button>
      </Box>

      <Card>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {classSubjects.length > 0 ? (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Image</TableCell>
                      <TableCell align="center">Subject Name</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {classSubjects.map((item, index) => (
                      <SubjectItem
                        key={index}
                        item={item}
                        setShowDeleteModel={setShowDeleteModel}
                        setDeleteId={setDeleteId}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  height: "200px",
                }}
              >
                <Typography variant="h5">No Class subject Found</Typography>
              </Box>
            )}
          </Box>
        )}
      </Card>
      <DeleteModel
        showModel={showDeleteModel}
        setShowModel={setShowDeleteModel}
        deleteHandle={deleteHandle}
        data="Class Subject"
        loading={deleteLoading}
      />
      <CreateClassSubjectModel showModel={showCreateModel} setShowModel={setShowCreateModel} classId={classId}  />
    </Container>
  );
}

function SubjectItem({ item, setShowDeleteModel, setDeleteId }) {
  const [loader, setLoader] = useState(true);


  const deleteButtonClick = () => {
    setShowDeleteModel(true)
    setDeleteId(item._id)
  }
  return (
    <TableRow>
      <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
        {loader && <CircularProgress />}
        <Box
          component={"img"}
          src={item.image}
          onLoad={() => setLoader(false)}
          sx={{
            display: loader ? "none" : "flex",
            width: "140px",
            height: "80px",
            objectFit: "cover",
            borderRadius: 1,
          }}
        />

      </TableCell>
      <TableCell align="center">{item.subjectName}</TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          sx={{
            backgroundImage: (theme) => theme.palette.gradientColors[0],
            p: 1.2,
          }}
          onClick={deleteButtonClick}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
