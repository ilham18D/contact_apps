import React from "react";
import MaterialTable from "material-table";
import {RequestResult, ModelContact} from '../../api/models';
import LinearProgress from "@material-ui/core/LinearProgress";
import DailogAddForm from "./dailogAddForm";
import { Alert } from "@material-ui/lab";
export interface ModelResultContact {
  message: string;
  data:ModelContact;
}
  
export default function ContentPage(){
  const [openDialogAdd, setOpenDialogAdd] = React.useState(false);
  const [contact, setDataContact] = React.useState<RequestResult<ModelResultContact[]>>({
    loading: false,
    result: {data:[]},
  })

  React.useEffect( () => {
    getData();
  },[])

  const loadData = React.useCallback(async () => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setDataContact(v => ({ ...v, loading: true }));
      fetch(`https://simple-contact-crud.herokuapp.com/contact`)
      .then(res => res.json() )
      .then(res => setDataContact({loading:false, result:res}) )
    } catch (error) {
      alert(error.message);
    }
  }

  const post = React.useCallback( async (newData:ModelContact ) => {
      try {
        setDataContact(v => ({ ...v, loading: true }));
        fetch(`https://simple-contact-crud.herokuapp.com/contact`, {
          method:'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData)
        }).then(res => res.json() )
          .then((newData) =>{
            console.log('sukses', newData)
            getData();
          })
      } catch (error) {
        alert(error.message)
        console.log(error)
      }
  }, [])

  const editData = React.useCallback( async(id:string, newData:ModelContact) => {
    try {
      const resultData = {
        firstName: newData.firstName,
        lastName: newData.lastName,
        age: newData.age,
        photo: newData.photo
      }
      fetch(`https://simple-contact-crud.herokuapp.com/contact/${id}`, {
        method:'put',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resultData)
      }).then(res => res.json() )
        .then((newData) =>{
          console.log('sukses', newData)
          getData();
        })
     
    } catch (error) {
      alert(error.message);
    }
  },[])

  const deleteData = React.useCallback( async(id:string) => {
    try {
      await fetch(`https://simple-contact-crud.herokuapp.com/contact/${id}`, {
        method:'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => res.json() )
        .then((newData) =>{
          console.log('sukses', newData)
          getData();
        })
    } catch (error) {
      console.log(error.message)
    }
  },[])
 
  return (
    <React.Fragment>
      {contact.loading &&  <LinearProgress /> }
      {contact.error && <Alert>{contact.error.message}</Alert>}
      <DailogAddForm
         open={openDialogAdd}
         setOpen={setOpenDialogAdd}
         save={ async(
          firstName,
          lastName,
          age,
          photo
         ) => {
           const newData = {
            firstName,
            lastName,
            age,
            photo
           }
           post(newData)
           console.log(JSON.stringify(newData))
         }}
      />
      <MaterialTable
      title="Table new Data"
      columns={[
        {
          title: 'tableData.id ',
          field: 'tableData',
          render: (rowData) => {
            return(
            <span>{rowData.tableData.id}</span>
            )
          },
          editable: 'never'
        },
       
        { title: 'age', field: 'age', type:"numeric" },
        { title: 'firstName', field: 'firstName' },
        { title: 'lastName', field: 'lastName' },
        {
          title: '',
          field: 'id',
          render: rowData => <></>,
          editable: 'never'
        },
        { 
          title: 'photo', 
          field: 'photo', 
          render:  (rowData, props) => {
            if(rowData.photo.length <=5){
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
      data={contact.result.data}
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
            console.log('add data')
          },
        },
      ]}
      editable={{
        onRowUpdate: (newData, oldData) => editData(newData.id, newData),
        onRowDelete: (oldData) => deleteData(oldData.tableData.id),
      }}
    />
     
    </React.Fragment>
  )
}