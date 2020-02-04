import React from 'react';
import {EditorState, RichUtils, AtomicBlockUtils} from 'draft-js';
import Editor from "draft-js-plugins-editor";
import HighlightPlugin from './plugins/highlightPlugin';
import addLinkPlugin from './plugins/addLinkPlugin';
import { mediaBlockRenderer } from  './entities/mediaBlockRenderer';
import BlockStyleToolbar, {getBlockStyle} from "./blockStyles/BlockStyleToolbar";


const highlightPlugin = HighlightPlugin();

class RTE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = editorState => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    this.plugins = [
        highlightPlugin,
        addLinkPlugin
    ];
  }

  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
     }
    
  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  onStrikeThroughClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "STRIKETHROUGH"))
  };
  
  onHighlight = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'HIGHLIGHT'))
   }
   
   onAddLink = () => {
    const editorState = this.state.editorState;
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -')
    if (!link) {
      this.onChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', { url: link });
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    this.onChange(RichUtils.toggleLink(newEditorState, selection, entityKey))
}

onURLChange = e => this.setState({ urlValue: e.target.value });

focus = () => this.refs.editor.focus();

onAddImage = e => {
    e.preventDefault();
    const editorState = this.state.editorState;
    const urlValue = window.prompt("Paste Image Link");
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "image",
      "IMMUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(
      editorState,
      { currentContent: contentStateWithEntity },
      "create-entity"
    );
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        )
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  };

  toggleBlockType = (blockType) => {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
    };


  render() {
    return (
    <div>
        <div className="toolbar">
        <BlockStyleToolbar
        editorState={this.state.editorState}
        onToggle={this.toggleBlockType}
        />
        <button className="inline styleButton" onClick={this.onUnderlineClick}>U</button>
        <button className="inline styleButton" onClick={this.onBoldClick}><b>B</b></button>
        <button className="inline styleButton" onClick={this.onItalicClick}><em>I</em></button>
        <button className="inline styleButton" onClick={this.onStrikeThroughClick}><s>S</s></button>
        <button className="inline styleButton" onClick={this.onHighlight}>
            <span style={{ background: "yellow" }}>H</span>
        </button>
        <button id="link_url" onClick={this.onAddLink} className="add-link">
          <i className="material-icons">insert_link</i>
        </button>
        <button className="inline styleButton" onClick={this.onAddImage}>
            <i
              className="material-icons"
              style={{
                fontSize: "16px",
                textAlign: "center",
                padding: "0px",
                margin: "0px"
              }}
            >
              image
            </i>
          </button> 
        </div>

        <div className="editors">   
            <Editor
            blockStyleFn={getBlockStyle} 
            blockRendererFn = {mediaBlockRenderer} 
            editorState={this.state.editorState} 
            handleKeyCommand={this.handleKeyCommand}
            plugins={this.plugins}
            onChange={this.onChange}
            ref="editor"
      />
        </div>
      </div>
    );
  }
}

export default RTE