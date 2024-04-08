import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setChangeAvatarModalOpen } from '../../Redux/reducers/modalReducer';
import { API, LOCAL_STORAGE } from '../../Utils/constanst/localConstanst';
import { changeAvatarAction } from '../../Redux/reducers/userReducer';
import { getAvatar } from '../../Templates/HomeTemplate/HomeTemplate';

export default function ChangeAvatarModal(props) {
    const dispatch = useDispatch();

    const { changeAvatarModalOpen } = useSelector((state) => state.modalReducer);
    const { data } = useSelector((state) => state.userReducer.userLogin);

    return changeAvatarModalOpen ? (
        <div className='modalLayout'>
            <div style={{
                marginTop: '10vh',
            }} className='modalContainer bg-white p-10 px-20'>
                <div className='flex justify-between items-center'>
                    <h3>Change avatar</h3>
                    <button onClick={() => dispatch(setChangeAvatarModalOpen(false))}><i className='fa fa-times text-2xl' /></button>
                </div>
                <div className='modalBody flex justify-center'>
                    <img
                        className='h-96 w-96 rounded-full object-cover'
                        src={getAvatar(data?.avatar || JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.avatar)}
                        alt=""
                    />
                </div>
                <div className='modalFooter flex justify-end'>
                    <button className='btn btn-primary' onClick={() => {
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";
                        input.onchange = (e) => {
                            const file = e.target.files[0];
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                                const formData = new FormData();
                                formData.append("file", file);
                                // console.log(data?.id, formData)
                                const userData = {
                                    id: data?.id || JSON.parse(localStorage.getItem(LOCAL_STORAGE.USER))?.id,
                                    avatar: formData,
                                }
                                dispatch(changeAvatarAction(userData));
                            };
                        }
                        input.click();
                    }}>Change</button>
                </div>
            </div>
        </div>
    ) : null;
}
