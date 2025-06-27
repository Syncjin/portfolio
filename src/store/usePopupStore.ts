import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { PopupArgumentsProps, PopupListItemProps } from "@/types/popup";

export interface PopupStoreState {
  popupList: PopupListItemProps[] | [];
  popupIdx: number;
  zIndex: number;
  setOpen: (payload: PopupArgumentsProps) => Promise<unknown>;
  setCloseHide: (popupIdx: number | undefined | null) => unknown;
  setClose: (popupIdx: number | undefined | null) => unknown;
}

export const usePopupStore = create<PopupStoreState>()(
  devtools((set) => ({
    popupList: [],
    popupIdx: 1,
    zIndex: 10000,
    setOpen: (payload) => {
      console.log("popupOpen 호출됨");
      console.log("payload:", payload);

      return new Promise((resolve) => {
        set(
          (state) => {
            const newState = {
              popupIdx: state.popupIdx + 1,
              popupList: [
                ...state.popupList,
                {
                  ...payload,
                  popupIdx: state.popupIdx,
                  isVisible: true,
                  _resolve: resolve,
                },
              ],
            };
            console.log("새로운 상태:", newState);
            return newState;
          },
          false,
          "popup/setOpen"
        );
      });
    },
    setCloseHide: (popupIdx) => {
      if (popupIdx) {
        set(
          (state) => ({
            popupList: state.popupList.map((v: PopupListItemProps) => {
              if (v.popupIdx === popupIdx) {
                return { ...v, isVisible: false };
              }
              return v;
            }),
          }),
          false,
          "popup/setCloseHide"
        );
      } else {
        set(
          () => ({
            popupList: [],
          }),
          false,
          "popup/setCloseHide"
        );
      }
    },
    setClose: (popupIdx) => {
      if (popupIdx) {
        set(
          (state) => ({
            popupList: state.popupList.filter((v: PopupListItemProps) => v.popupIdx !== popupIdx),
          }),
          false,
          "popup/setClose"
        );
      } else {
        set(
          () => ({
            popupList: [],
          }),
          false,
          "popup/setClose"
        );
      }
    },
  }))
);
