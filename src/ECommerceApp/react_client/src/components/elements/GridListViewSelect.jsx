
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';

export default function GridListViewSelect({state, setState}) {
    return (
        <div className="flex items-center">
            <div onClick={() => {
                if(state) setState(!state);
            }}
            className={`w-8 h-8 flex rounded-l-sm items-center justify-center border border-blue-600 text-blue-600 cursor-pointer
            ${!state ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
            title='The List View'>
                <ViewListIcon className="w-6 h-6"/>
            </div>
            <div onClick={() => {
                if(!state) setState(!state);
            }}
            className={`w-8 h-8 flex rounded-r-sm items-center justify-center border border-blue-600 text-blue-600 cursor-pointer
            ${state ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
            title='The Grid View'>
                <ViewModuleIcon className="w-5 h-5"/>
            </div>
        </div>
    );
}