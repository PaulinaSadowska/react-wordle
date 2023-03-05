

interface MessageProps {
    message: String
}

export default function Message({ message }: MessageProps) {
    return (
        <div className="message-container">
            {message ? <p>{message}</p> : undefined }
        </div>
    );
}