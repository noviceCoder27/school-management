import toast from 'react-hot-toast'


export const toastError = (msg) => {
    toast.error(msg, {
        duration: 2000,
        position: 'top-right',
        iconTheme: {
            primary: 'rgb(248, 63, 63)',
            secondary: '#fff',
        },
    style: {
        padding: "1rem"
    }})
}