import React from "react";
import MaterialTable from "material-table";
import {RequestResult, ModelContact} from '../../api/models';

export interface ModelResultContact {
  message: string;
  data:ModelContact;
}
  
export default function ContentPage(){

  const [contact, setDataContact] = React.useState<RequestResult<ModelResultContact[]>>({
    loading: false,
    result: [],
  })

  React.useEffect( () => {
    getData();
  },[])

  const getData = async () => {
    try {
    
      fetch(`https://simple-contact-crud.herokuapp.com/contact`)
      .then(res => res.json() )
      .then(res => setDataContact({loading:false, result:res}) )
   
      // throw new Error(result.statusText);
    } catch (error) {
      console.log(error)
      alert(error.message);
    }
  }
  console.log(contact.result.data);
  return (
    <React.Fragment>
      <MaterialTable
      title="Simple Action Preview"
      columns={[
        { title: 'age', field: 'age' },
        { title: 'firstName', field: 'firstName' },
        { title: 'lastName', field: 'lastName' },
        { title: 'photo', field: 'photo' },
      ]}
      data={contact.result.data}
      actions={[
        {
          icon: 'save',
          tooltip: 'Save User',
          onClick: (event, rowData) => alert("You saved ")
        }
      ]}
    />
     
    </React.Fragment>
  )
}