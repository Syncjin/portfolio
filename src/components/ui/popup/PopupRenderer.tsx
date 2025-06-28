"use client";
import { usePopupStore } from "@/store/usePopupStore";
import dynamic from "next/dynamic";
import { useMemo, useCallback } from "react";
import { PopupListItemProps } from "@/types/popup";

const AlertPopup = dynamic(() => import("./AlertPopup"), { ssr: false });
const ConfirmPopup = dynamic(() => import("./ConfirmPopup"), { ssr: false });

function PopupRenderer() {
  const { popupList, setClose, setCloseHide } = usePopupStore();

  console.log("PopupRenderer 렌더링, popupList:", popupList);

  const handleClose = useCallback(
    (popupIdx: number, _resolve?: (value: unknown) => unknown) => {
      console.log("팝업 닫기:", popupIdx);
      if (_resolve) {
        _resolve(false);
      }
      setCloseHide(popupIdx);
      // 애니메이션 완료 후 팝업 제거
      setTimeout(() => {
        setClose(popupIdx);
      }, 200);
    },
    [setClose, setCloseHide]
  );

  const handleConfirm = useCallback(
    (popupIdx: number, _resolve?: (value: unknown) => unknown) => {
      console.log("팝업 확인:", popupIdx);
      if (_resolve) {
        _resolve(true);
      }
      setCloseHide(popupIdx);
      // 애니메이션 완료 후 팝업 제거
      setTimeout(() => {
        setClose(popupIdx);
      }, 200);
    },
    [setClose, setCloseHide]
  );

  const popupView = useMemo(() => {
    console.log("popupView 계산, popupList:", popupList);
    return popupList.map((params: PopupListItemProps) => {
      const { type, title, msg, textOk, textCancel, color, popupIdx, isVisible, _resolve } = params;

      console.log("팝업 렌더링:", { type, title, isVisible, popupIdx });

      if (!isVisible) return null;

      switch (type) {
        case "alert":
          return <AlertPopup key={popupIdx} isOpen={isVisible} onClose={() => handleClose(popupIdx, _resolve)} title={title || "알림"} message={msg} confirmText={textOk || "확인"} />;
        case "confirm":
          return (
            <ConfirmPopup
              key={popupIdx}
              isOpen={isVisible}
              onClose={() => handleClose(popupIdx, _resolve)}
              onConfirm={() => handleConfirm(popupIdx, _resolve)}
              title={title || "확인"}
              message={typeof msg === "string" ? msg : ""}
              confirmText={textOk || "확인"}
              cancelText={textCancel || "취소"}
              type={color === "danger" ? "danger" : color === "warning" ? "warning" : "info"}
            />
          );
        default:
          return <></>;
      }
    });
  }, [popupList, handleClose, handleConfirm]);

  return <div id="popupContainerWrap">{popupView}</div>;
}

export default PopupRenderer;
