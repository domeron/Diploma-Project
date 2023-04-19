export default function ProfileImage({dimension, url}) {
    return (
        <div className={`w-${dimension} h-${dimension} flex items-center justify-center border border-gray-500 rounded-full`}>
            <img src={`https://localhost:7077/${url}`} className="w-full h-full rounded-full"/>
        </div>
    );
}