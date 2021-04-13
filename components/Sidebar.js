import { Avatar, Button, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from 'email-validator';
import { db, auth } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import Chat from './Chat'

function Sidebar() {
    
    const [user] = useAuthState(auth); // keep track of current user
    // Query to firebase database to get all chats
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    // get a real time list of chats
    const [chatsSnapshot] = useCollection(userChatRef)

    const createChat = () => {
        const input = prompt(
            'Please enter an email address for the user you wish to chat with'
            );
        if (!input) return null;    
           
        // validate if email input is valid and chat doesn't already exist
        if(EmailValidator.validate(input) && 
            !chatExists(input) && 
            input !== user.email
            ) {
            // add chat to DB 'chats' collection ( create a one to one chat between two users)
            db.collection('chats').add({
                users: [user.email, input],
            })
        }
    
    };
    
    // check if chat already exists
    const chatExists = (recipientEmail) => 
        // return boolean if chat exists
        !!chatsSnapshot?.docs.find(
            (chat) => 
                chat.data().users.find((user) => user === recipientEmail)?.length > 0
        );
    
    return (
       <Container>
            <Header>
                <UserAvatar src ={user.photoURL} onClick={() => auth.signOut()} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton> 
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
       
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chat" />
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            {chatsSnapshot?.docs.map(chat => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
       </Container>
    )
}

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

     // hide scrollbar
     ::-webkit-scrollbar{
        display: none;
    }
    -ms-overflow-style: none; // IE and Edge
    scrollbar-width: none; // Firefox


`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SidebarButton = styled(Button)`
    width: 100%;
    // Increase priority ( override default)
    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    } 
`;

const SearchInput = styled.input`
    outline-width: 0; // no outline when clicked
    border: none;
    flex: 1; // uses entire width
`;

const Header = styled.div`
    display:flex;
    position: sticky;
    top:0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover {
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`

`;
