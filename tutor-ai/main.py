import cv2
from classes.PlateFinder import PlateFinder
from classes.NeuralNetwork import NeuralNetwork

if __name__ == '__main__':

    findPlate = PlateFinder()

    # Initialize the Neural Network
    model = NeuralNetwork()

    cap = cv2.VideoCapture('test/video.MOV')
    # while cap.isOpened():
    #     ret, img = cap.read()
    #     if ret:
    #         cv2.imshow('original video', img)
    #         if cv2.waitKey(25) & 0xFF == ord('q'):
    #             break
    #         possible_plates = findPlate.find_possible_plates(img)
    #         if possible_plates is not None:
    #             for i, p in enumerate(possible_plates):
    #                 chars_on_plate = findPlate.char_on_plate[i]
    #                 recognized_plate, _ = model.label_image_list(chars_on_plate, imageSizeOuput=128)
    #                 print(recognized_plate)
    #                 cv2.imshow('plate', p)
    #                 if cv2.waitKey(25) & 0xFF == ord('q'):
    #                     break
    #     else:
    #         break
    # cap.release()

    img = cv2.imread('test/test2.jpeg')
    possible_plates = findPlate.find_possible_plates(img)
    print(possible_plates, 1)
    if possible_plates is not None:
        for i, p in enumerate(possible_plates):
            chars_on_plate = findPlate.char_on_plate[i]
            recognized_plate, _ = model.label_image_list(chars_on_plate, imageSizeOuput=128)
            # cv2.imshow('plate', recognized_plate)
            # cv2.waitKey(0)
            cv2.imshow('plate', p)
            cv2.waitKey(0)
    cv2.destroyAllWindows()
