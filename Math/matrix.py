class Matrix:
    """A n-dimensional square matrix.
    """
    def __init__(self, entries):
        """ (Matrix, list of list of num) -> NoneType
        Create a n-dimensional square matrix
        
        >>> A = Matrix([[1, 2], [3, 4]])
        >>> isinstance(A, Matrix)
        True
        """
        if all([len(i) == len(entries) for i in entries]):
            self.entries = entries
            self.dimension = len(entries)
        else:
            raise Exception("incorrect dimensions")
        
    def __str__(self):
        """ (Matrix) -> str
        Return string representation of Matrix.
        
        >>> A = Matrix([[1, 2], [3, 4]])
        >>> print(A)
        >>> 1 2
        ... 3 4
        """
        result = ""
        for i in range(self.dimension):
            for j in range(self.dimension):
                result += str(self.entries[i][j]) + " "
            if i != self.dimension - 1:
                result += "\n"
        return result
    
    def __repr__(self):
        return "Matrix({})".format(self.entries)
    
    def _create_zero(self, size):
        """(Matrix) -> Matrix
        Creates a zero matrix with same dimensions as self
        """
        entries = []
        for i in range(size):
            entries.append([])
            for j in range(size):
                entries[i].append(0)
        return Matrix(entries)
        
    def add(self, other):
        """ (Matrix, Matrix) -> Matrix
        Adds two matrices.
        """
        if self.dimension != other.dimension:
            raise Exception("incorrect dimensions")
        else:
            result = self._create_zero(self.dimension)
            
            for i in range(self.dimension):
                for j in range(self.dimension):
                    result.entries[i][j] = self.entries[i][j] + other.entries[i][j]
            return result
    
    def sub(self, other):
        """ (Matrix, Matrix) -> Matrix
        Subtracts other from self.
        """
        if self.dimension != other.dimension:
            raise Exception("incorrect dimensions")
        else:
            result = self._create_zero(self.dimension)
            
            for i in range(self.dimension):
                for j in range(self.dimension):
                    result.entries[i][j] = self.entries[i][j] - other.entries[i][j]
            return result
    
    def mult(self, other):
        """ (Matrix, Matrix) -> Matrix
        Multiplies two matrices together
        """
        if self.dimension != other.dimension:
            raise Exception("incorrect dimensions")
        else:
            result = self._create_zero(self.dimension)
            
            for i in range(self.dimension):
                for j in range(self.dimension):
                    result.entries[i][j] = sum([self.entries[i][k] * other.entries[k][j] for k in range(self.dimension)])
            return result
    
    def matrixOperation(self, other, operator):
        """(Matrix, Matrix, str) -> Matrix
        Operates on two matrices
        """
        if operator == "ADD":
            return self.add(other)
        elif operator == "SUBTRACT":
            return self.sub(other)
        elif operator == "MULTIPLY":
            return self.multiply(other)
        else:
            raise Exception("does not recognize operator")
    
    def minor(self, k):
        """(Matrix) -> Matrix
        Return minor of matrix
        """
        minor_entries = []
        
        for i in range(self.dimension):
            if i != 0:
                minor_entries.append(self.entries[i][:])
        
        for i in range(self.dimension - 1):
            del minor_entries[i][k]

        return Matrix(minor_entries)
    
    def det(self):
        """(Matrix) -> num
        Return determinant of Matrix
        """
        if self.dimension == 1:
            return self.entries[0][0]
        elif self.dimension == 2:
            return self.entries[0][0] * self.entries[1][1] - self.entries[0][1] * self.entries[1][0]
        else:
            return sum([(-1) ** (j + 2) * self.entries[0][j] * self.minor(j).det() for j in range(self.dimension)])
        
    def is_invertible(self):
        """(Matrix) -> bool
        Return True iff Matrix is invertible
        """
        return self.det() == 0
    
    def rank(self):
        """(Matrix) -> int
        Return rank of Matrix
        """
        pass
    
    def rref(self):
        """(Matrix) -> Matrix
        Return RREF (row-reduced echelon form) of Matrix
        """
        pass