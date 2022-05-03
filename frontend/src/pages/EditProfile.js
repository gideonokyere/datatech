import React from 'react';
import { Form,Input,Card,Row,Col,Button,message,Avatar} from 'antd';
import {gql,useMutation} from '@apollo/client';
import { PROFILE_QUERY } from './Profile';

const UPDATE_USER = gql`
   mutation UpdateUser($name:String!,$bio:String,$phone:String,$email:String!,$password:String){
       updateUser(data:{name:$name,bio:$bio,phone:$phone,email:$email,password:$password}){
        id
        name
        bio
        phone
        email
        password
      }
   }
`;

const EditProfile = ({name,bio,phone,email}) =>{

     const [updateUser,{loading,error}] = useMutation(UPDATE_USER,{refetchQueries:[PROFILE_QUERY]});
    const [form] = Form.useForm();

    if(error){
        message.error(error.message);
    }

    const onFinish = async(values)=>{
        const {name,bio,phone,email,password} = values;
        await updateUser({variables:{name,bio,phone,email,password}});
        message.success('Profile updated');
    }

    return(
        <Row justify='center'>
            <Col span={8}>
                <Card>
                   <div className='profile-data'>
                       <div className='profile-title'>Change Info</div>
                       <span className='profile-sub-title'>Changes will be reflected to every services</span>
                     </div>

                     <Form.Item>
                       <Avatar size={50} shape='square' src={'https://joeschmoe.io/api/v1/random'}/>
                     </Form.Item>

                    <Form
                      name='profile_edit'
                      form={form}
                      onFinish={onFinish}
                      layout='vertical'
                      initialValues={{
                          name,bio,phone,email
                      }}
                    >
                        <Form.Item
                         name='name'
                         label='Name'
                         rules={[
                             {
                                 type:'string',
                                 min:3,
                                 max:30,
                                 required:true,
                                 message:'Please enter your name'
                            }
                         ]}
                        >
                          <Input size='large' style={{borderRadius:'10px'}}/>
                        </Form.Item>

                        <Form.Item
                          name='bio'
                          label='Bio'
                        >
                            <Input.TextArea size='large' style={{borderRadius:'10px'}}/>
                        </Form.Item>
                            
                        <Form.Item
                          name='phone'
                          label='Phone'
                          rules={[
                              {
                                  type:'string',
                                  min:10,
                                  max:14,
                                  required:true,
                                  message:'Please provide a 10 digit phone number'
                              }
                          ]}
                        >
                           <Input size='large' style={{borderRadius:'10px'}}/>
                        </Form.Item>

                        <Form.Item
                        name='email'
                        label='Email'
                        rules={[
                            {
                                type:'email',
                                message:'Please enter a valid e-mail address'
                            },
                            {
                            required:true,
                            message:'Please enter your email address'
                           }
                        ]}
                        hasFeedback
                      >
                        <Input placeholder='Email' size='large' style={{borderRadius:'10px'}}/>
                      </Form.Item>

                      <Form.Item
                       name='password'
                       label='Password'
                       rules={[
                       {
                           min:6,
                           message:'Password is too short'
                       },
                       {
                           max:15,
                           message:'Passsword is too long'
                       }
                     ]}
                    >
                        <Input bordered={true} placeholder='Password' size='large' type='password' style={{borderRadius:'10px'}}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' size='large' loading={loading?true:false} htmlType='submit' style={{borderRadius:'10px'}}>
                            Save
                        </Button>
                    </Form.Item>

                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default EditProfile;