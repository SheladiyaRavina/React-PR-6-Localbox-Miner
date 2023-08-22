import { useEffect, useState } from "react"

const Crud = () => {

    const [input,setInput]=useState({
        fname:'', lname:'',email:'',password:'',address:'',city:'',salary:'',
    })

    const [alldata,setAlldata]=useState([]);
    const [edit,setEdit]=useState("");

    const handlechange = (e) =>{
        const {name,value} = e.target;
        setInput({
            ...input,[name]:value
        })
    }

    const handleSubmit = ()=>{
       if(edit){
            let ans = alldata.map((v)=>{
               if(v.id == edit){
                return ({
                    ...v,
                        fname:input.fname,
                        lname:input.lname,
                        email:input.email,
                        password:input.password,
                        address:input.address,
                        city:input.city,
                        salary:input.salary,
                   })
               }
               return v
            })
            setAlldata(ans);
            alert("data successfully add");
            setEdit("");
       }else{
        const {fname,lname,email,password,address,city,salary}=input;
        let obj = {
            id:Math.floor(Math.random()*1000),
            fname:fname,
            lname:lname,
            email:email,
            password:password,
            address:address,
            city:city,
            salary:salary,
        }
        let data =[...alldata,obj];
        setAlldata(data);
        localStorage.setItem('crud',JSON.stringify(data));
       }
        setInput({
            fname:'', lname:'',email:'',password:'',address:'',city:'',salary:'',
        })
    }

    const deleteData = (id)=>{
        let ans = alldata.filter((v)=>{
            return v.id !== id
        })
        setAlldata(ans);
        localStorage.setItem('crud',JSON.stringify(ans));
    }

    const editData =(id)=>{
        let ans = alldata.filter((v)=>{
            return v.id == id
        })
        setInput(ans[0]);
        setEdit(id);
    }

    useEffect = ()=>{
        let data = JSON.parse(localStorage.getItem('crud'));
        if(!data){
            setAlldata([]);
        }else{
            setAlldata(data);
        }
    }

    const showFrom = () => {
        document.getElementById('from').style.display = 'Block'
    }

    return (
        <> 
        <body>
            <header className="p-3">Employee Management App</header>
            <div className="container">
                <h1 className="text-center">Employee List</h1>
                <button className="btn1" onClick={() => showFrom()}>Add Employee</button>
                <form className="row d-flex g-3" id="from" style={{ display: 'none' }}>
                    <div className="col-md-6">
                        <label className="form-label">Employee Frist Name</label>
                        <input type="text" name="fname" className="form-control" onChange={handlechange} value={input.fname} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Employee Last Name</label>
                        <input type="text" name="lname" className="form-control" onChange={handlechange} value={input.lname}/>
                    </div>
                    <div className="col-6">
                        <label className="form-label">Employee Email id</label>
                        <input type="email" name="email" className="form-control" onChange={handlechange} value={input.email}/>
                    </div>
                    <div className="col-6">
                        <label className="form-label">Password</label>
                        <input type="password" name="password" className="form-control" onChange={handlechange} value={input.password}/>
                    </div>
                    <div className="col-6">
                        <label className="form-label">Address</label>
                        <input type="text" name="address" className="form-control" onChange={handlechange} value={input.address}/>
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">City</label>
                        <input type="text" className="form-control" name="city" onChange={handlechange} value={input.city}/>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Employee Salary</label>
                        <input type="text" className="form-control" name="salary" onChange={handlechange} value={input.salary}/>
                    </div>
                    
                    <div className="col-12">
                        {
                            (edit) ? (<button type="button" className="btn btn-warning" onClick={()=>handleSubmit()}>Edit</button>) :
                            (<button type="button" className="btn btn-warning" onClick={()=>handleSubmit()}>Submit</button>)
                        }
                    </div>

                    <br></br><br></br>

                
                </form>

                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Employee Frist Name</th>
                            <th>Employee Last Name</th>
                            <th>Employee Email Id</th>
                            <th>Password</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Employee Salary</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            alldata.map((v)=>{
                              const {id,fname,lname,email,password,address,city,salary} = v;
                              return(
                                <tr>
                                    <td>{id}</td>
                                    <td>{fname}</td>
                                    <td>{lname}</td>
                                    <td>{email}</td>
                                    <td>{password}</td>
                                    <td>{address}</td>
                                    <td>{city}</td>
                                    <td>{salary}</td>
                                    <td>
                                        <input type="button" className="delete" value="Delete" onClick={()=>deleteData(id)}/>--
                                        <input type="button" className="edit" value="Edit" onClick={()=>editData(id)}/></td>
                                </tr>
                              )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </body>
        </>
    )
}
export default Crud;