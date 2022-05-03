import React,{useState} from 'react';
import {Row,Col,Card,Divider, Avatar,Button} from 'antd';
import {gql,useQuery} from '@apollo/client';
import EditProfile from './EditProfile';

export const PROFILE_QUERY = gql`
    query GetUserById{
       getUserById{
        id
        name
        bio
        phone
        email
        password
      }
    }
`;

const ProfilePage = () =>{
    const [showEdit,setShowEdit] = useState(false);
    const {loading,error,data} = useQuery(PROFILE_QUERY);

    if(loading) return <div>Load....</div>;

    if(error) return <div>{error.message}</div>;

    const {name,bio,phone,email} = data.getUserById;

    return (
        <>

        {showEdit?
           <EditProfile name={name} bio={bio} phone={phone} email={email}/>
            :<Row justify='center'>
            <Col span={8}>
                <div className='profile-intro'>Personal Info</div>
                <Card 
                  style={{ borderSize:'1px', borderStyle:'solid', borderColor:'#E0E0E0', borderRadius:'0.75em'}}
                >
                   <Row>
                      <Col span={20}>
                      <div className='profile-data'>
                         <div className='profile-title'>Profile</div>
                         <span className='profile-sub-title'>Some info may be visible to other people</span>
                      </div>
                      </Col>
                      <Col>
                         <Button style={{borderRadius:'10px'}} onClick={()=>setShowEdit(true)}>Edit</Button>
                      </Col>
                    </Row>
                    <Divider/>

                    <div className='profile-data'>
                        <Row>
                            <Col span={4}>Photo: </Col>
                            <Col><Avatar size={40} shape='square' src={'https://joeschmoe.io/api/v1/random'}/></Col>
                        </Row>
                    </div>
                    <Divider/>

                    <div className='profile-data'>
                        <Row>
                            <Col span={6}>Name </Col>
                            <Col>{name}</Col>
                        </Row>
                    </div>
                    <Divider/>

                    <div className='profile-data'>
                        <Row>
                            <Col span={6}>Bio</Col>
                            <Col>{bio}</Col>
                        </Row>
                    </div>
                    <Divider/>

                    <div className='profile-data'>
                        <Row>
                            <Col span={6}>Phone</Col>
                            <Col>{phone}</Col>
                        </Row>
                    </div>
                    <Divider/>

                    <div className='profile-data'>
                        <Row>
                            <Col span={6}>Email</Col>
                            <Col>{email}</Col>
                        </Row>
                    </div>
                    <Divider/>

                    <div className='profile-data'>
                        <Row>
                            <Col span={8}>Password</Col>
                            <Col>******</Col>
                        </Row>
                    </div>
                </Card>
            </Col>
        </Row>
     }
     </>
    )
}

export default ProfilePage;