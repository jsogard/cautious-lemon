import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export default function ErrorTip({ subject, messages }) {

    return (
        <OverlayTrigger
            placement='right'
            overlay={
                <Tooltip id={`tooltip-${subject}`}>
                    <ul>
                        { messages.map((message, i) => <li key={i} >{message}</li>) }
                    </ul>
                </Tooltip>
            }
            >
            <FontAwesomeIcon icon={faExclamationCircle} />
        </OverlayTrigger>
    )
}