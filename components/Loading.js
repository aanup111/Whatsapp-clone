 import { Circle } from 'better-react-spinkit';

function Loading() {
    return (
        <center style={{ display:'grid', placeItems: 'center', height: '100vh' }}>
            <div>
                <img 
                src='https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg'
                alt=''
                style={{ marginBottom: 10 }}
                height={400}
                />
            <Circle color='#00FFFF' size={100} />
            </div>
        </center>
    )
}

export default Loading
