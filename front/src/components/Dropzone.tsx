import { FileWithPath, useDropzone } from "react-dropzone";
import styled from 'styled-components';

const getColor = (props: any) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isFocused) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

function Dropzone(props: any) {

  const { callFiles, setFieldValue } = props;

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles
  } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'video/*': ['.mp4', '.mov', '.wmv', '.mkv', '.avi', '.flv'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 5,
    onDrop: acceptedFiles => {
      
      let newCallFiles = [...callFiles.concat(acceptedFiles)]

      setFieldValue("callFiles", newCallFiles)

    }
  });

  const removeFile = (file: FileWithPath) => () => {
    callFiles.splice(callFiles.indexOf(file), 1)
    setFieldValue("callFiles", callFiles)
  }

  const files = callFiles.map((file: FileWithPath) => 
    <li className='my-1' key={file.path}>      
      <button type='button' className='btn btn-sm btn-icon btn-danger me-2' onClick={removeFile(file)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill m-0" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
        </svg>
      </button>
      {file.path}
    </li>
  );

  return (
    <section className="container border border-1 rounded py-2">
      <Container {...getRootProps({className: 'dropzone', isFocused, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>Arraste e solte os arquivos aqui, ou clique para selecionar</p>
        <em>(Máximo 5 arquivos)</em>
      </Container>
      {files.length > 0 ? 
        <aside>
          <label className="fs-6">Arquivos:</label>
          <ul className="mb-0">{files}</ul>
        </aside>
      : ''}      
    </section>
  );

}

export default Dropzone;