import React from 'react'
import {connect} from 'react-redux'
import styles from './styles.scss'
import {showStatus} from '../../action.js'
import InformationCard from './informationCard'
import backIcon from './reply.png'
class Slide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showInformationCard: false
        }
    }
    _toggleInformationCard() {
        this.setState({
            showInformationCard: !this.state.showInformationCard
        })
    }
    _onButtonClick() {
        this.props.history.push('/list')
    }
    render() {
        let {groups, dispatch, guest,} = this.props
        let index = parseInt(this.props.match.params.index)
        let group = groups[index - 1]
        if (group == undefined) {
            return (
                <div className={styles.container}>
                    <div className={styles.ppt}>
                        我的天呀！好像哪裡爆炸了
                    </div>
                </div>
            )
        }

        let {ppt} = group

        return (
            <div className={styles.container}>
                <button onClick={this._onButtonClick.bind(this)} className={styles.backButton} type="button"><img src={backIcon}/></button>
                <PPT src={ppt} dispatch={dispatch}/>
                <div className={styles.block} style={this.state.showInformationCard
                    ? {}
                    : {
                        display: "none"
                    }} onClick={this._toggleInformationCard.bind(this)}></div>
                <InformationCard group={group} index={index} show={this.state.showInformationCard} toggle={this._toggleInformationCard.bind(this)} guest={guest}/>
            </div>
        )
    }
}
class PPT extends React.Component {
    componentDidMount() {
        if (this.props.src !== "") {
            this.props.dispatch(showStatus("正在拼命為您加載檔案"))
        }
    }
    render() {

        let {src, dispatch} = this.props
        let ppt
        if (src == "") {
            ppt = "找不到簡報檔案"
        } else if (src.match(/.pdf$/)) {
            ppt = (<iframe src={`../reveal.js/index.html?pdfPath=${src}`}/>)
        } else {
            ppt = (<iframe src={src}/>)
        }
        return (
            <div className={styles.ppt}>
                {ppt}
            </div>
        )
    }
}

const mapToStore = (store) => {
    return {groups: store.groups, guest: store.guest,}

}
export default connect(mapToStore)(Slide)
