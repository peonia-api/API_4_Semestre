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

  const { setFieldValue } = props;

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
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 5,
    onDrop: acceptedFiles => {
      setFieldValue("callFiles", acceptedFiles);
    }
  });

  const files = acceptedFiles.map((file: FileWithPath) => <li key={file.path}>{file.path}</li>);

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