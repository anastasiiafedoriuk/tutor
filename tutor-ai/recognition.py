import cv2
import imutils
import numpy as np
import pytesseract

pytesseract.pytesseract.tesseract_cmd = r'tesseract'


def detect(source):
    gray = cv2.cvtColor(source, cv2.COLOR_BGR2GRAY)

    cv2.imshow('plate', gray)
    cv2.waitKey(0)

    gray = cv2.bilateralFilter(gray, 13, 15, 15)

    edged = cv2.Canny(gray, 30, 200)

    contours = cv2.findContours(edged.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    contours = imutils.grab_contours(contours)
    contours = sorted(contours, key=cv2.contourArea, reverse=True)[:10]
    screenCnt = None

    for c in contours:

        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.018 * peri, True)

        if len(approx) == 4:
            screenCnt = approx
            break

    if screenCnt is None:
        detected = 0
        return
    else:
        detected = 1

    if detected == 1:
        cv2.drawContours(source, [screenCnt], -1, (0, 0, 255), 3)

    mask = np.zeros(gray.shape, np.uint8)
    new_image = cv2.drawContours(mask, [screenCnt], 0, 255, -1, )
    new_image = cv2.bitwise_and(source, source, mask=mask)

    (x, y) = np.where(mask == 255)
    (topx, topy) = (np.min(x), np.min(y))
    (bottomx, bottomy) = (np.max(x), np.max(y))
    Cropped = gray[topx:bottomx + 1, topy:bottomy + 1]

    cv2.imshow('mask', source)
    cv2.waitKey(0)

    text = pytesseract.image_to_string(Cropped, config=r'--psm 10 --oem 3 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    print("Detected license plate Number is:", text)


def video():
    cap = cv2.VideoCapture('test/video.MOV')
    while cap.isOpened():
        ret, img = cap.read()
        if ret:
            detect(img)
    cap.release()


def image():
    img = cv2.imread('test/test2.jpeg', cv2.IMREAD_COLOR)
    detect(img)


if __name__ == '__main__':
    image()
