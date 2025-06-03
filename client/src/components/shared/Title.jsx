import { Helmet } from 'react-helmet-async'
const Title = ({title="ChatApp" , description="this is a chat APP"}) => {
  return (
    <Helmet>
        <title>
            {title}
        </title>
        <meta name='description' content={description}/>
    </Helmet>
  )
}

export default Title
