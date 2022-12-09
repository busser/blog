package d06

import (
	"errors"
	"fmt"
	"io"
)

func Solve(r io.Reader, w io.Writer) error {
	datastream, err := io.ReadAll(r)
	if err != nil {
		return fmt.Errorf("could not read input: %w", err)
	}

	position, err := blockPosition(datastream[:], 14)
	if err != nil {
		return err
	}

	_, err = fmt.Fprintf(w, "%d", position)
	return err
}

func blockPosition(datastream []byte, size int) (int, error) {
	for i := 0; i < len(datastream)-size; i++ {
		if !hasDuplicates(datastream[i : i+size]) {
			return i + size, nil
		}
	}

	return 0, errors.New("not found")
}

func hasDuplicates(block []byte) bool {
	bits := make([]byte, 32)

	for _, b := range block {
		i, mask := b/8, byte(1<<(b%8))
		if bits[i]&mask != 0 {
			return true
		}
		bits[i] |= mask
	}

	return false
}
