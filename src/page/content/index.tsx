import React from "react";
import MaterialTable from "material-table";
import {RequestResult, ModelContact, ObjectModelContact} from '../../api/models';
import LinearProgress from "@material-ui/core/LinearProgress";
import DailogAddForm from "./dailogAddForm";
import Details from "./details"
import { Alert } from "@material-ui/lab";
import axios from 'axios';
import {
  RootState,
  contactAddMany,
  contacUpdate,
  contactDelete
} from '../../store'

import { useDispatch, useSelector } from "react-redux";
export default function ContentPage(){
  const dispatch = useDispatch();
  const contactState = useSelector((state:RootState) => 
  state.contac
  );
  const [openDialogAdd, setOpenDialogAdd] = React.useState(false);
  const [stateLoading, setStateLoading] = React.useState<RequestResult<ObjectModelContact[]>>({
    loading: false,
  })
  const [stateDetails, setStateDetails ] = React.useState<ObjectModelContact | undefined>(undefined)
  React.useEffect( () => {
    getData()
    // eslint-disable-next-line
  },[])
  const loadData = async () => {
    getData();
  }
  const getData = async () => {
    try {
      setStateLoading({loading:true});
      const urlApi = await axios.get(`https://simple-contact-crud.herokuapp.com/contact`,{
        headers: {'Content-Type': 'application/json',}
      });
      if(urlApi.status === 200) {
        setStateLoading({loading:false});
        dispatch(contactAddMany(urlApi.data.data))
      }
    } catch (error) {
      alert(error.message)
    }
  }
  const post = async (newData:ObjectModelContact) => {
    try {
      setStateLoading({loading:true});
      const rowAdd:ModelContact ={
        firstName: newData.firstName,
        lastName: newData.lastName,
        age: newData.age,
        photo: newData.photo
      }
      const result = await axios.post<ObjectModelContact>(
        `https://simple-contact-crud.herokuapp.com/contact`,
        rowAdd,{
          headers: {'Content-Type': 'application/json',}
        })
        if(result.status === 201){
          getData()
          setStateLoading({loading:false});
          alert(result.statusText);
        }
      return
    } catch (error) {
      alert(error.message)
      setStateLoading({loading:false});
    }
  }
  const editData =async(newData:ObjectModelContact, oldData?:ObjectModelContact) => {
    try {
      if(!oldData) return;
      const resultData = {
        firstName: newData.firstName,
        lastName: newData.lastName,
        age: newData.age,
        photo: newData.photo
      }
      const result = await axios.put(`https://simple-contact-crud.herokuapp.com/contact/${newData.id}`,
      resultData,{
        headers: {'Content-Type': 'application/json',}
      })
      if(result.status === 200 || result.status === 201){
        dispatch(contacUpdate(newData))
      }
    
    } catch (error) {
      alert(error.message);
    }
  }
  const deleteData = async(oldData:ObjectModelContact) => {
    try {
      setStateLoading({loading:true});
      await axios.delete(
        `https://simple-contact-crud.herokuapp.com/contact/${oldData.id}`,
        {
          headers: {'Content-Type': 'application/json',}
        }
      )
      dispatch(contactDelete(oldData));
      setStateLoading({loading:false});
      return;
    } catch (error) {
      alert(error.message)
      setStateLoading({loading:false});
    }
  }
  const rowDataTabel = contactState.map(o => ({...o}))
  
  return (
    <React.Fragment>
      {stateLoading.loading &&  <LinearProgress /> }
      {stateLoading.error && <Alert>{stateLoading.error.message}</Alert>}
      <Details
        details = {stateDetails}
        close= {() => setStateDetails(undefined)}
      />
      <DailogAddForm
         open={openDialogAdd}
         setOpen={setOpenDialogAdd}
         save={ async(
          firstName,
          lastName,
          age,
          photo
         ) => {
           const newData= {
            id:"",
            firstName,
            lastName,
            age,
            photo
           }
           post(newData);
          
         }}
      />
      <MaterialTable
      title="Table"
      columns={[
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Age',
          field: 'age',
          type:"numeric",
          render: (rowData) => <>{rowData.age} years</>
        },
        { 
          title: 'photo', 
          field: 'photo', 
          render:  (rowData, props) => {
            if(rowData.photo.length <=10){
              return(
                <img  style={{ height: 36, }} src="/imageDefault.png" alt="" />
              )
            }
            return(
              <img
              style={{ height: 36 }}
              src={rowData.photo} alt=""
              />
            )
          }
        },
      ]}
      data={rowDataTabel}
      actions={[
        {
          icon: "refresh",
          tooltip: "Refresh",
          isFreeAction: true,
          onClick: (event) => {
            loadData();
          },
        },
        {
          icon: "add",
          tooltip: "Add Users",
          isFreeAction: true,
          onClick: (event) => {
            setOpenDialogAdd(true);
          },
        },
        {
          icon: "info",
          tooltip: "Detail Produk",
          onClick: (event, rowData) => {
            const selectedData = rowData as ObjectModelContact;
            if (selectedData) {
              setStateDetails(selectedData);
            }
          },
        },
      ]}
      editable={{
        onRowUpdate: (newData, oldData) => editData(newData, oldData),
        onRowDelete: (oldData) => deleteData(oldData),
      }}
    />
    </React.Fragment>
  )
}
