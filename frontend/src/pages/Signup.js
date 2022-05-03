import React from 'react';
import { Row,Col,Card,Form,Input,Button,message } from 'antd';
import {MailFilled,LockFilled,TwitterOutlined,GoogleOutlined,FacebookFilled,GithubFilled} from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import { gql,useMutation } from '@apollo/client';

const SIGNUP_MUTATION = gql`
    mutation SignUp($email:String!,$password:String!){
        signUp(data:{email:$email,password:$password})
    }
`;

const SignUpPage = () =>{
    const [form] = Form.useForm();
    const[signUp,{loading,error}]=useMutation(SIGNUP_MUTATION);
    const navigate = useNavigate();
    
    if(error){
        return <div>{message.error(error.message.split(':')[1])}</div>;
    }

    const onFinish = async (values) =>{
       const {email,password} = values; 
       const response = await signUp({variables:{email,password}});
       if(response.data){
           localStorage.setItem('token',response.data.signUp);
           navigate('/profile');
       }
    }

    return(
        <Row justify='center'>
            <Col span={8}>
               <Card
                 style={{ borderSize:'1px', borderStyle:'solid', borderColor:'#E0E0E0', borderRadius:'0.75em'}}
               >
                   <article className='login-intro'>
                       Join thousands of learners from <br/> around the world 
                   </article>

                   <article className='login-sub-intro'>
                      Master web development by making real-life<br/>projects. There are multiple paths for you to<br/> choose
                   </article>

                   <Form name='signup_form' onFinish={onFinish} form={form}>
                      <Form.Item
                        name='email'
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
                        <Input prefix={<MailFilled />} placeholder='Email' size='large' style={{borderRadius:'10px'}}/>
                      </Form.Item>

                    <Form.Item
                       name='password'
                       rules={[
                        {
                           required:true,
                           message:'Please enter password'
                       },
                       {
                           min:6,
                           message:'Password is too short'
                       },
                       {
                           max:15,
                           message:'Passsword is too long'
                       }
                     ]}
                       hasFeedback
                    >
                        <Input prefix={<LockFilled/>} bordered={true} placeholder='Password' size='large' type='password' style={{borderRadius:'10px'}}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type='primary' htmlType='submit' loading={loading?true:false} size='large' block style={{borderRadius:'10px'}}>
                             Start coding now
                        </Button>
                    </Form.Item>
                   </Form>

                   <div className='social-intro'>or continue with these social profile</div>

                   <div className='icon-container'>{/****Social icons */}

                      <div className='icon-circle'>
                        <GoogleOutlined className='icon-position'/>
                      </div>

                      <div className='icon-circle'>
                        <FacebookFilled className='icon-position'/>
                      </div>

                       <div className='icon-circle'>
                        <TwitterOutlined className='icon-position'/>
                       </div>

                       <div className='icon-circle'>
                         <GithubFilled className='icon-position'/>
                       </div>

                   </div>{/********End Of social icons */}
                  
                   <div className='linked-page'>Already a member? <Link to='/'>Login</Link></div>

               </Card>
            </Col>
        </Row>
    );
 }

export default SignUpPage;