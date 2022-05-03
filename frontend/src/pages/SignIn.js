import React from 'react';
import { Row,Col,Card,Form,Input,Button,message } from 'antd';
import {MailFilled,LockFilled,TwitterOutlined,GoogleOutlined,FacebookFilled,GithubFilled} from '@ant-design/icons';
import { Link,useNavigate } from 'react-router-dom';
import { gql,useMutation } from '@apollo/client';

const SIGNIN_MUTATION = gql`
   mutation SignIn($email:String!,$password:String!){
       signIn(data:{email:$email,password:$password})
   }
`;

const SignInPage = () =>{
    const [form] = Form.useForm();
    const [signIn,{loading,error}] = useMutation(SIGNIN_MUTATION);
    const navigate = useNavigate();

    if(error){
        return <div>{message.error(error.message.split(':')[1])}</div>;
    }

    const onFinish = async(values) =>{
        const {email,password} = values;
        const response = await signIn({variables:{email,password}});
        if(response.data){
            localStorage.setItem('token',response.data.signIn);
            navigate('/profile');
        }
    }

    return(
        <Row justify='center'>
            <Col span={8}>
               <Card
                 style={{ borderSize:'1px', borderStyle:'solid', borderColor:'#E0E0E0', borderRadius:'0.75em'}}
               >
                   <div className='login-page-intro'>Login</div>

                   <Form name='signin_form' onFinish={onFinish} form={form}>
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
                             Login
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
                  
                   <div className='linked-page'>Don't have an account yet? <Link to='/signup'>Register</Link></div>

               </Card>
            </Col>
        </Row>
    );
 }
 
 export default SignInPage;