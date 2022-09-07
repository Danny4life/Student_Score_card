import { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { FormSelect, FormButton, Form, FormInput2 } from "../component";
import { Heading2, Paragraph, Card2, Select2 } from "../styling/css";
import axios from "axios";
import swal from "sweetalert";


type PageProps = {}

const BASEURL = process.env.REACT_APP_BASEURL;

const SuperAdminCreateAdmin = (props: PageProps): JSX.Element => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    stack: '',
    role: '',
    squad: '',
    password: '1234'
  })
  const [stacks, setStacks] = useState([]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASEURL}/admin/create_user`, userData,{
        headers: {
          'authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if(response.statusText === 'Created') {
        swal('Success', `Admin ${response.data.firstName} ${response.data.lastName} has been created`, 'success');
        setUserData({
          firstName: '',
          lastName: '',
          email: '',
          stack: '',
          role: '',
          squad: '',
          password: '1234'
        });
      }
    } catch (err: any) {
      /** replace with custom contextual error message */
      if(err?.response.data.error) {
        const message = err?.response.data.error.includes('E1100') ? 'A user already exists with this email' : err?.response.data.error;
        swal('Failed', message, "error");
      }
      console.error(err);
    }
  }

  useEffect(() => {
    axios.get(`${BASEURL}/admin/view_all_stack`, {
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((data) => {
      setStacks(data.data.data);
    }).catch((err) => {
      /** replace with custom contextual error message */
      console.error(err);
    })
  }, [])

    return (
        <div style={{ width: '1200px'}}>
          <Heading2>Create Admin 
            <div>
                <Link to='/admin-dashboard/view-all-admins' style={{
                    fontSize: 'calc(2rem - 18px)',
                    fontWeight: '300',
                    backgroundColor: 'white',
                    borderRadius: '5px',
                    border: '1px solid #249800',
                    textDecoration: 'none',
                    color: '#249800',
                    padding: '0.5rem 0.5rem'
                }}>View all Admins</Link>
            </div>
          </Heading2>
            
          <Card2>
            <Paragraph>
            Fill in all required details.
            </Paragraph>
    
            <div style={{ padding: "2rem 2.5rem" }}>
              <Form onSubmit={handleSubmit} >

                <FormInput2 
                    name="firstName"
                    placeholder="Enter First Name"
                    label="First Name"
                    type="text"
                    errorMsg="First name cannot be blank"
                    setSharedState={(s: string) => { setUserData({ ...userData, firstName: s }) }}
                />
                <FormInput2 
                    name="lastName"
                    placeholder="Enter Last Name"
                    label="Last Name"
                    type="text"
                    errorMsg="Last name cannot be blank"
                    setSharedState={(s: string) => { setUserData({ ...userData, lastName: s }) }}
                />
                <FormInput2 
                name="email" 
                placeholder="Enter Email" 
                label="Email" 
                type="email" 
                errorMsg="Please enter a valid email address" 
                setSharedState={(s: string) => { setUserData({ ...userData, email: s }) }}
                // firstValue="Name cannot be blank"
                />
                <div style={{ marginBottom: '0.7rem' }}>
                  <label style={{ 
                    fontWeight: '400',
                    marginBottom: '0.7rem',
                    color: '#21334F',
                    display: 'block' }}>Stack</label>
                  <Select2 name="stack" id="stack" onChange={(e) => { setUserData({ ...userData, stack: e.target.value }) }}>
                      <option value="">Select...</option>
                      { stacks.length > 0 && stacks.map((e: any) => (
                        <option key={e._id} value={e.name}>{e.name}</option>
                      )) }
                  </Select2>
                </div>
                <div style={{ marginBottom: '0.7rem' }}>
                  <label style={{ 
                    fontWeight: '400',
                    marginBottom: '0.7rem',
                    color: '#21334F',
                    display: 'block' }} htmlFor='role'>Assign Roles</label>
                  <Select2 name="role" id="role" onChange={(e) => { setUserData({ ...userData, role: e.target.value }) }}>
                      <option value="">Select..</option>
                      <option value="SL">Stack Lead</option>
                      <option value="SA">Stack Associate</option>
                      <option value="PA">Program Associate</option>
                      <option value="Other">Other</option>
                  </Select2>
                </div>
                <FormInput2 
                name="squad" 
                placeholder="011" 
                label="Squad" 
                type="text" 
                errorMsg="Please enter a valid Squad e.g. - 012" 
                setSharedState={(s: string) => { setUserData({ ...userData, squad: s }) }}
                // firstValue="Name cannot be blank"
                />

                <FormButton text="Create Admin" />
              </Form>
            </div>
          </Card2>
        </div>)
}

export default SuperAdminCreateAdmin;