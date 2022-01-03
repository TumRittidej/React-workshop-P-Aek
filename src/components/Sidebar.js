import React from 'react'

const Sidebar = () => {
    // let fullName = 'John'
    const [fullName, setFullname] = React.useState('John')
    const [isShow, setIsShow] = React.useState(true)

    const changeName = () => {
        setFullname('Mary')
        setIsShow(!isShow)
    }

    React.useEffect(() => {
        // ทำงานทุกครั้งเมื่อมีการ re-render ui 
        console.log('useeffect');
    })
    React.useEffect(() => {
        // ทำงานแค่รอบเดียว  
        console.log('useeffect one time only');
    },[])
    React.useEffect(() => {
        // ทำงานรอบแรกก่อน และเรียกใช้อีกครั้งเมื่อ fullName เปลี่ยนค่า
        console.log('useeffect => ' + fullName);
    },[fullName])


    return (
        <>
            <h3>Sideber</h3>   
            {
                isShow ? <p>Hello</p> : <p>World</p>
            }
            <p>
                สวัสดี {fullName}
            </p>
            <button onClick={changeName}>เปลี่ยนชื่อ</button>
        </>
    )
}

export default Sidebar