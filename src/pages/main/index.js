import React from 'react'
import styles from './styles.scss'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        sessionStorage.setItem("animation","false")
    }
    render() {
        let {groups} = this.props
        let noAnimation=false
        if(sessionStorage.getItem("animation")=="false"){
            noAnimation=true
        }

        groups = groups.map((g, i) => (<Group group={g} key={i} index={i+1} noAnimation={noAnimation}/>))
        return (
            <div className={styles.container}>
                <h1 className={styles.title}>分組名單</h1>
                <div className={styles.list}>
                    {groups}
                </div>
            </div>
        )
    }
}

const Group = ({group, index,noAnimation}) => {
    let {name,preview}=group
    return (
        <Link to={`/slide/${index}`} className={noAnimation?"":styles.firstTimes}>
            <div style={{backgroundImage:`url("${preview}")`}}>
                <h3>{index}</h3>
                <h2>{name}</h2>
            </div>
        </Link>
    )
}


const mapToStore=(Store)=>{
    return{
        groups:Store.groups
    }

}
export default connect(mapToStore)(Main)
