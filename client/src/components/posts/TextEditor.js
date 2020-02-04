import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = ({ id, label, input, meta: { touched, error } }) => (
    <div className="editor">
      <label
        htmlFor={id}
        style={{ marginBottom: '5px' }}
      >
        {label}
      </label>
      <Editor
      {...input}
        apiKey="lakzr7lia0chztw1mmkfaj4m0sxg83oepgox9e5a340aupo7"
        value={input.value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount',
            'formatpainter emoticons imagetools spellchecker'
          ],
          toolbar:
            'undo redo | formatselect | bold italic | emoticons | \
            alignleft aligncenter alignright | formatpainter | image | \
            bullist numlist outdent indent | spellchecker | help'
        }}
        onChange={e => input.onChange(e.target.getContent())}
    />
  </div>
);



export default TextEditor;