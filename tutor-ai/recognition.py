import cv2
import imutils
import numpy
import pytesseract as pts

pts.pytesseract.tesseract_cmd = r'tesseract'
pts_config = r'--psm 10 --oem 3 -c tessedit_char_whitelist=0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'


def show_image(src):
    cv2.imshow('plate', src)
    cv2.waitKey(0)


def convert_to_gray(src):
    gray_image = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)
    show_image(gray_image)
    gray = cv2.bilateralFilter(gray_image, 13, 15, 15)
    show_image(gray)
    return gray


def get_contours(src):
    edged_image = cv2.Canny(src, 30, 200)
    image_contours = cv2.findContours(edged_image.copy(), cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    image_contours = imutils.grab_contours(image_contours)
    image_contours = sorted(image_contours, key=cv2.contourArea, reverse=True)[:10]
    return image_contours


def draw_contour(src, mask, screen_contour):
    new_image = cv2.drawContours(mask, [screen_contour], 0, 255, -1, )
    new_image = cv2.bitwise_and(src, src, mask=mask)
    show_image(new_image)


def get_cropped(mask, gray_src):
    (x, y) = numpy.where(mask == 255)
    (top_x, top_y) = (numpy.min(x), numpy.min(y))
    (bottom_x, bottom_y) = (numpy.max(x), numpy.max(y))
    return gray_src[top_x:bottom_x + 1, top_y:bottom_y + 1]


def detect(source):
    show_image(source)
    gray = convert_to_gray(source)
    contours = get_contours(gray)
    screen_contour = None
    for contour in contours:
        perimeter = cv2.arcLength(contour, True)
        approx_poly = cv2.approxPolyDP(contour, 0.018 * perimeter, True)

        if len(approx_poly) == 4:
            screen_contour = approx_poly
            break

    if screen_contour is not None:
        detected_contour = 1
    else:
        return

    if detected_contour == 1:
        cv2.drawContours(source, [screen_contour], -1, (0, 0, 255), 3)

    mask = numpy.zeros(gray.shape, numpy.uint8)
    draw_contour(source, mask, screen_contour)

    cropped = get_cropped(mask, gray)
    show_image(source)

    possible_plate = pts.image_to_string(cropped, config=pts_config)
    print("Possible license plate Number is:", possible_plate)


def video():
    cap = cv2.VideoCapture('test/video.MOV')
    while cap.isOpened():
        ret, img = cap.read()
        if ret:
            detect(img)
    cap.release()


def image():
    img = cv2.imread('test/test9.jpeg', cv2.IMREAD_COLOR)
    detect(img)


if __name__ == '__main__':
    image()
