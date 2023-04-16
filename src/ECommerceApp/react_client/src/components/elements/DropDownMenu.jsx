export default function DropDownMenu(props) {
    return (
        <div
        className="absolute top-6 right-0 bg-white w-32 border-t border-gray-400">
            {props.children}
        </div>
    );
}