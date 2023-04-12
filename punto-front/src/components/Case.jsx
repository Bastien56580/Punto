export const Case = ({children}) => {

    return (
        <div style={{
            width:'3rem',
            height: '3rem',
            border: '1px solid white',
            position: 'relative',
            padding: '2px'
        }}>
            {children}
        </div>
    )
}